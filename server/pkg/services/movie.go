package services

import (
	"fmt"
	"time"

	"github.com/dan6erbond/jolt-server/internal/tmdb"
	"github.com/dan6erbond/jolt-server/pkg/models"
	"github.com/spf13/viper"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

type MovieService struct {
	db         *gorm.DB
	log        *zap.Logger
	tmdbClient *tmdb.Client
}

func (svc *MovieService) GetTmdbDiscoverMovies(syncWithTmdb ...bool) ([]*models.Movie, error) {
	movie, err := svc.tmdbClient.DiscoverMovie()

	if err != nil {
		return nil, err
	}

	movies, err := svc.SaveTmdbDiscoverMovies(movie, syncWithTmdb...)

	if err != nil {
		return nil, err
	}

	return movies, nil
}

func (svc *MovieService) SaveTmdbDiscoverMovies(movie *tmdb.DiscoverMovie, syncWithTmdb ...bool) ([]*models.Movie, error) {
	movieChan := make(chan *models.Movie, len(movie.Results))

	for i := range movie.Results {
		go func(m tmdb.DiscoverMovieResult) {
			dbMovie, err := svc.GetOrCreateMovieByTmdbID(m.ID, syncWithTmdb...)
			if err != nil {
				svc.log.Sugar().Errorw(err.Error(), "movie", dbMovie)
				movieChan <- nil

				return
			}

			if len(syncWithTmdb) > 0 && !syncWithTmdb[0] {
				dbMovie.Title = m.Title
				dbMovie.Overview = m.Overview
				dbMovie.BackdropPath = m.BackdropPath
				dbMovie.PosterPath = m.PosterPath

				err = svc.db.Save(dbMovie).Error
				if err != nil {
					svc.log.Error(err.Error())
					movieChan <- nil

					return
				}
			}

			movieChan <- dbMovie
		}(movie.Results[i])
	}

	var movies []*models.Movie
	//nolint:wsl
	for i := 0; i < len(movie.Results); i++ {
		if m := <-movieChan; m != nil {
			movies = append(movies, m)
		}
	}

	if len(syncWithTmdb) > 0 && !syncWithTmdb[0] {
		err := svc.db.Save(movies).Error
		if err != nil {
			return nil, err
		}
	}

	return movies, nil
}

func (svc *MovieService) SyncMovie(movie *models.Movie) error {
	if movie.SyncedWithTmdb {
		return nil
	}

	tmdbMovie, err := svc.tmdbClient.Movie(fmt.Sprint(movie.TmdbID))

	if err != nil {
		return err
	}

	movie.TmdbID = uint(tmdbMovie.ID)

	for _, genre := range tmdbMovie.Genres {
		movie.Genres = append(movie.Genres, genre.Name)
	}

	if tmdbMovie.Title != "" {
		movie.Title = tmdbMovie.Title
	} else {
		movie.Title = tmdbMovie.OriginalTitle
	}

	movie.Tagline = tmdbMovie.Tagline
	movie.Overview = tmdbMovie.Overview
	movie.PosterPath = tmdbMovie.PosterPath
	movie.BackdropPath = tmdbMovie.BackdropPath

	if tmdbMovie.ReleaseDate != "" {
		releaseDate, err := time.Parse(tmdb.DateFormat, tmdbMovie.ReleaseDate)
		if err != nil {
			return err
		}

		movie.ReleaseDate = releaseDate
	}

	//nolint:nestif
	if movie.Certification == "" && !movie.CertificationDoesntExist {
		releaseDates, err := svc.tmdbClient.MovieReleaseDates(fmt.Sprint(movie.TmdbID))
		if err != nil {
			return err
		}

		if len(releaseDates.Results) == 0 {
			movie.CertificationDoesntExist = true
		} else {
			certificationCountryCode := viper.GetString("tmdb.country")
			fallbackCertificationCountryCode := viper.GetString("tmdb.fallbackcountry")
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

	err = svc.db.Save(movie).Error

	return err
}

func (svc *MovieService) GetOrCreateMovieByTmdbID(tmdbID int, syncWithTmdb ...bool) (*models.Movie, error) {
	var movie models.Movie
	err := svc.db.FirstOrInit(&movie, "tmdb_id = ?", tmdbID).Error

	if err != nil {
		return nil, err
	}

	movie.TmdbID = uint(tmdbID)

	if len(syncWithTmdb) == 0 || syncWithTmdb[0] {
		err = svc.SyncMovie(&movie)
		if err != nil {
			return nil, err
		}
	} else {
		err = svc.db.Save(&movie).Error
		if err != nil {
			return nil, err
		}
	}

	return &movie, nil
}

func (svc *MovieService) GetOrCreateMovieByID(id uint, syncWithTmdb ...bool) (*models.Movie, error) {
	var movie models.Movie
	err := svc.db.FirstOrInit(&movie, id).Error

	if err != nil {
		return nil, err
	}

	if len(syncWithTmdb) == 0 || syncWithTmdb[0] {
		err = svc.SyncMovie(&movie)
		if err != nil {
			return nil, err
		}
	} else {
		err = svc.db.Save(&movie).Error
		if err != nil {
			return nil, err
		}
	}

	return &movie, nil
}

func NewMovieService(
	log *zap.Logger,
	db *gorm.DB,
	tmdbService *tmdb.Client,
) *MovieService {
	return &MovieService{db, log, tmdbService}
}
