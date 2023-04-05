package services

import (
	"fmt"
	"time"

	"github.com/dan6erbond/jolt-server/internal/tmdb"
	"github.com/dan6erbond/jolt-server/pkg/models"
	"github.com/spf13/viper"
	"gorm.io/gorm"
)

type MovieService struct {
	db          *gorm.DB
	tmdbService *tmdb.Service
}

func (svc *MovieService) SaveTmdbDiscoverMovies(movie *tmdb.DiscoverMovie) ([]*models.Movie, error) {
	movies := make([]*models.Movie, len(movie.Results))

	for i, m := range movie.Results {
		dbMovie, err := svc.GetOrCreateMovieByTmdbID(m.ID)
		if err != nil {
			return nil, err
		}

		dbMovie.Title = m.Title
		dbMovie.BackdropPath = m.BackdropPath
		dbMovie.PosterPath = m.PosterPath

		dbMovie, err = svc.SyncMovie(dbMovie)

		if err != nil {
			return nil, err
		}

		movies[i] = dbMovie
	}

	err := svc.db.Table("movies").Save(movies).Error

	return movies, err
}

func (svc *MovieService) SyncMovie(movie *models.Movie) (*models.Movie, error) {
	if !movie.SyncedWithTmdb {
		tmdbMovie, err := svc.tmdbService.Movie(fmt.Sprint(movie.TmdbID))

		if err != nil {
			return nil, err
		}

		for _, genre := range tmdbMovie.Genres {
			movie.Genres = append(movie.Genres, genre.Name)
		}

		movie.Tagline = tmdbMovie.Tagline

		if tmdbMovie.ReleaseDate != "" {
			releaseDate, err := time.Parse("2006-01-02", tmdbMovie.ReleaseDate)
			if err != nil {
				return nil, err
			}
			movie.ReleaseDate = releaseDate
		}

		if movie.Certification == "" && !movie.CertificationDoesntExist {
			releaseDates, err := svc.tmdbService.MovieReleaseDates(fmt.Sprint(movie.TmdbID))
			if err != nil {
				return nil, err
			}

			if len(releaseDates.Results) == 0 {
				movie.CertificationDoesntExist = true
			} else {
				certificationCountryCode := viper.GetString("tmdb.certificationcountry")
				fallbackCertificationCountryCode := viper.GetString("tmdb.fallbackcertificationcountry")
				var (
					fallbackCertification string
					certificationFound    bool
				)
				for _, releaseDate := range releaseDates.Results {
					if releaseDate.Iso31661 == certificationCountryCode {
						for _, rdReleaseDate := range releaseDate.ReleaseDates {
							if rdReleaseDate.Certification != "" {
								movie.Certification = rdReleaseDate.Certification
								certificationFound = true
								break
							}
						}
					} else if releaseDate.Iso31661 == fallbackCertificationCountryCode {
						for _, rdReleaseDate := range releaseDate.ReleaseDates {
							if rdReleaseDate.Certification != "" {
								fallbackCertification = rdReleaseDate.Certification
							}
						}
					}
				}
				if !certificationFound {
					if fallbackCertification != "" {
						movie.Certification = fallbackCertification
					} else {
						movie.CertificationDoesntExist = true
					}
				}
			}
		}

		movie.SyncedWithTmdb = true
	}
	return movie, nil
}

func (svc *MovieService) GetOrCreateMovieByTmdbID(tmdbID int) (*models.Movie, error) {
	var movie models.Movie
	err := svc.db.FirstOrCreate(&movie, "tmdb_id = ?", tmdbID).Error

	if err != nil {
		return nil, err
	}

	movie.TmdbID = tmdbID

	svc.SyncMovie(&movie)

	err = svc.db.Save(movie).Error
	if err != nil {
		return nil, err
	}

	return &movie, nil
}

func NewMovieService(db *gorm.DB, tmdbService *tmdb.Service) *MovieService {
	return &MovieService{db, tmdbService}
}
