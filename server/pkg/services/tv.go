package services

import (
	"fmt"
	"time"

	"github.com/dan6erbond/jolt-server/internal/tmdb"
	"github.com/dan6erbond/jolt-server/pkg/models"
	"gorm.io/gorm"
)

type TvService struct {
	db         *gorm.DB
	tmdbClient *tmdb.Client
}

func (svc *TvService) GetTmdbDiscoverTv(syncWithTmdb bool) ([]*models.Tv, error) {
	tv, err := svc.tmdbClient.DiscoverTV()

	if err != nil {
		return nil, err
	}

	tvs, err := svc.SaveTmdbDiscoverTv(tv, syncWithTmdb)

	if err != nil {
		return nil, err
	}

	return tvs, nil
}

func (svc *TvService) SaveTmdbDiscoverTv(tv *tmdb.DiscoverTV, syncWithTmdb bool) ([]*models.Tv, error) {
	tvs := make([]*models.Tv, len(tv.Results))

	for i, tv := range tv.Results {
		dbTv, err := svc.GetOrCreateTvByTmdbID(tv.ID, syncWithTmdb)
		if err != nil {
			return nil, err
		}

		dbTv.Name = tv.Name
		dbTv.Overview = tv.Overview
		dbTv.PosterPath = tv.PosterPath
		dbTv.BackdropPath = tv.BackdropPath

		tvs[i] = dbTv
	}

	err := svc.db.Save(tvs).Error
	if err != nil {
		return nil, err
	}

	return tvs, err
}

func (svc *TvService) SyncTv(tv *models.Tv) error {
	tmdbTv, err := svc.tmdbClient.Tv(fmt.Sprint(tv.TmdbID))

	if err != nil {
		return err
	}

	err = svc.SyncTvSeasons(tv, tmdbTv)

	if err != nil {
		return err
	}

	if tv.SyncedWithTmdb {
		return nil
	}

	tv.TmdbID = uint(tmdbTv.ID)

	for _, genre := range tmdbTv.Genres {
		tv.Genres = append(tv.Genres, genre.Name)
	}

	tv.Name = tmdbTv.Name
	tv.Overview = tmdbTv.Overview
	tv.Tagline = tmdbTv.Tagline
	tv.InProduction = tmdbTv.InProduction
	tv.PosterPath = tmdbTv.PosterPath
	tv.BackdropPath = tmdbTv.BackdropPath

	if tmdbTv.FirstAirDate != "" {
		FirstAirDate, err := time.Parse(tmdb.DateFormat, tmdbTv.FirstAirDate)
		if err != nil {
			return err
		}

		tv.FirstAirDate = FirstAirDate
	}

	tv.SyncedWithTmdb = true

	err = svc.db.Save(tv).Error

	if err != nil {
		return err
	}

	return nil
}

func (svc *TvService) GetOrCreateTvByTmdbID(tmdbID int, syncWithTmdb ...bool) (*models.Tv, error) {
	var tv models.Tv
	err := svc.db.FirstOrInit(&tv, "tmdb_id = ?", tmdbID).Error

	if err != nil {
		return nil, err
	}

	tv.TmdbID = uint(tmdbID)

	if len(syncWithTmdb) == 0 || syncWithTmdb[0] {
		err = svc.SyncTv(&tv)
		if err != nil {
			return nil, err
		}
	} else {
		err = svc.db.Save(&tv).Error
		if err != nil {
			return nil, err
		}
	}

	return &tv, nil
}

func (svc *TvService) GetOrCreateTvByID(id uint, syncWithTmdb ...bool) (*models.Tv, error) {
	var tv models.Tv
	err := svc.db.FirstOrInit(&tv, id).Error

	if err != nil {
		return nil, err
	}

	if len(syncWithTmdb) == 0 || syncWithTmdb[0] {
		err = svc.SyncTv(&tv)
		if err != nil {
			return nil, err
		}
	} else {
		err = svc.db.Save(&tv).Error
		if err != nil {
			return nil, err
		}
	}

	return &tv, nil
}

func (svc *TvService) SyncTvSeasons(tv *models.Tv, tmdbTvs ...*tmdb.Tv) error {
	if !tv.InProduction && !tv.SyncedWithTmdb {
		return nil
	}

	var (
		err    error
		tmdbTv *tmdb.Tv
	)
	if len(tmdbTvs) > 0 {
		tmdbTv = tmdbTvs[0]
	} else {
		tmdbTv, err = svc.tmdbClient.Tv(fmt.Sprint(tv.TmdbID))
	}

	if err != nil {
		return err
	}

	var seasons []*models.Season
	err = svc.db.Model(tv).Order("number asc").Preload("Tv").Association("Seasons").Find(&seasons)

	if err != nil {
		return err
	}

OUTER:
	for _, season := range tmdbTv.Seasons {
		for i, s := range seasons {
			if s.TmdbID == uint(season.ID) {
				if i == len(seasons)-1 || !s.SyncedWithTmdb {
					err = svc.SyncTvSeasonEpisodes(s)

					if err != nil {
						return err
					}
				}
				if !s.SyncedWithTmdb {
					s.Number = uint(season.SeasonNumber)
					s.TmdbID = uint(season.ID)
					s.Name = season.Name
					s.Overview = season.Overview
					s.PosterPath = season.PosterPath
					s.SyncedWithTmdb = true

					err = svc.db.Save(s).Error

					if err != nil {
						fmt.Println("services/tv.go:201")
						return err
					}
				}

				continue OUTER
			}
		}
		s := models.Season{
			TmdbID:     uint(season.ID),
			Name:       season.Name,
			Overview:   season.Overview,
			PosterPath: season.PosterPath,
			Number:     uint(season.SeasonNumber),
		}
		svc.db.Model(tv).Association("Seasons").Append(&s)

		err = svc.SyncTvSeasonEpisodes(&s)

		if err != nil {
			fmt.Println("services/tv.go:222")
			return err
		}

		svc.db.Model(&s).Update("synced_with_tmdb", true)
	}

	return nil
}

func (svc *TvService) GetTvSeasons(tv *models.Tv, syncWithTmdb ...bool) ([]*models.Season, error) {
	if len(syncWithTmdb) == 0 || syncWithTmdb[0] {
		err := svc.SyncTvSeasons(tv)

		if err != nil {
			return nil, err
		}
	}

	var seasons []*models.Season
	err := svc.db.Model(tv).Association("Seasons").Find(&seasons)

	if err != nil {
		return nil, err
	}

	return seasons, nil
}

func (svc *TvService) SyncTvSeasonEpisodes(season *models.Season) error {
	var (
		tv  *models.Tv
		err error
	)
	if (season.CreatedAt == time.Time{}) {
		tv = &season.Tv
	} else {
		tv, err = svc.GetOrCreateTvByID(season.TvID, false)

		if err != nil {
			return err
		}
	}

	tmdbSeason, err := svc.tmdbClient.TvSeason(fmt.Sprint(tv.TmdbID), season.Number)

	if err != nil {
		return err
	}

	var episodes []*models.Episode
	err = svc.db.Model(season).Order("number asc").Association("Episodes").Find(&episodes)

	if err != nil {
		fmt.Println("services/tv.go:270")
		return err
	}

	var episodesToInsert []models.Episode

OUTER:
	for _, ep := range tmdbSeason.Episodes {
		for _, e := range episodes {
			if e.TmdbID == uint(ep.ID) {
				if !e.SyncedWithTmdb {
					e.TmdbID = uint(ep.ID)
					e.Number = uint(ep.EpisodeNumber)
					e.Name = ep.Name
					e.Overview = ep.Overview
					e.StillPath = ep.StillPath
					e.SyncedWithTmdb = true

					err = svc.db.Save(e).Error
					if err != nil {
						fmt.Println("services/tv.go:270")
						return err
					}
				}

				continue OUTER
			}
		}
		episodesToInsert = append(episodesToInsert, models.Episode{
			TmdbID:         uint(ep.ID),
			Number:         uint(ep.EpisodeNumber),
			SeasonID:       season.ID,
			Name:           ep.Name,
			Overview:       ep.Overview,
			StillPath:      ep.StillPath,
			SyncedWithTmdb: true,
		})
	}

	err = svc.db.Model(season).Association("Episodes").Append(episodesToInsert)
	if err != nil {
		fmt.Println("services/tv.go:270")
	}

	return err
}

func (svc *TvService) GetTvSeasonEpisodes(season *models.Season, syncWithTmdb ...bool) ([]*models.Episode, error) {
	if len(syncWithTmdb) == 0 || syncWithTmdb[0] {
		err := svc.SyncTvSeasonEpisodes(season)

		if err != nil {
			return nil, err
		}
	}

	var episodes []*models.Episode
	err := svc.db.Model(season).Association("Episodes").Find(&episodes)

	if err != nil {
		return nil, err
	}

	return episodes, nil
}

func NewTvService(db *gorm.DB, tmdbService *tmdb.Client) *TvService {
	return &TvService{db, tmdbService}
}
