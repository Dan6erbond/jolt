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

func (svc *TvService) SyncTv(tv *models.Tv) (*models.Tv, error) {
	tmdbTv, err := svc.tmdbClient.Tv(fmt.Sprint(tv.TmdbID))

	if err != nil {
		return nil, err
	}

	err = svc.SyncTvSeasons(tv)

	if err != nil {
		return nil, err
	}

	if tv.SyncedWithTmdb {
		return tv, nil
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
			return nil, err
		}

		tv.FirstAirDate = FirstAirDate
	}

	tv.SyncedWithTmdb = true

	return tv, nil
}

func (svc *TvService) GetOrCreateTvByTmdbID(tmdbID int, syncWithTmdb ...bool) (*models.Tv, error) {
	var tv models.Tv
	err := svc.db.FirstOrCreate(&tv, "tmdb_id = ?", tmdbID).Error

	if err != nil {
		return nil, err
	}

	tv.TmdbID = uint(tmdbID)

	syncedTv := &tv
	if len(syncWithTmdb) == 0 || syncWithTmdb[0] {
		syncedTv, err = svc.SyncTv(&tv)
		if err != nil {
			return nil, err
		}
	}

	err = svc.db.Save(syncedTv).Error
	if err != nil {
		return nil, err
	}

	return syncedTv, nil
}

func (svc *TvService) GetOrCreateTvByID(id uint, syncWithTmdb ...bool) (*models.Tv, error) {
	var tv models.Tv
	err := svc.db.FirstOrCreate(&tv, id).Error

	if err != nil {
		return nil, err
	}

	syncedTv := &tv
	if len(syncWithTmdb) == 0 || syncWithTmdb[0] {
		syncedTv, err = svc.SyncTv(&tv)
		if err != nil {
			return nil, err
		}
	}

	err = svc.db.Save(syncedTv).Error
	if err != nil {
		return nil, err
	}

	return syncedTv, nil
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

	var seasons []models.Season
	err = svc.db.Model(tv).Order("number asc").Association("Season").Find(&seasons)

	if err != nil {
		return err
	}

	var seasonsToInsert []models.Season

OUTER:
	for _, season := range tmdbTv.Seasons {
		for i, s := range seasons {
			if s.TmdbID == uint(season.ID) {
				if i == len(seasons)-1 || !s.SyncedWithTmdb {
					err = svc.SyncTvSeasonEpisodes(&s)

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

					err = svc.db.Save(season).Error

					if err != nil {
						return err
					}
				}

				continue OUTER
			}
		}
		s := models.Season{
			TmdbID:         uint(season.ID),
			Name:           season.Name,
			Overview:       season.Overview,
			PosterPath:     season.PosterPath,
			Number:         uint(season.SeasonNumber),
			SyncedWithTmdb: true,
		}
		seasonsToInsert = append(seasonsToInsert, s)

		err = svc.SyncTvSeasonEpisodes(&s)

		if err != nil {
			return err
		}
	}

	svc.db.Model(tv).Association("Seasons").Append(seasonsToInsert)

	return nil
}

func (svc *TvService) GetTvSeasons(tv *models.Tv) ([]*models.Season, error) {
	err := svc.SyncTvSeasons(tv)

	if err != nil {
		return nil, err
	}

	var seasons []*models.Season
	err = svc.db.Model(tv).Association("Seasons").Find(&seasons)

	if err != nil {
		return nil, err
	}

	return seasons, nil
}

func (svc *TvService) SyncTvSeasonEpisodes(season *models.Season) error {
	if season.Tv.TmdbID == 0 {
		panic("Tv must be preloaded for season")
	}

	tmdbSeason, err := svc.tmdbClient.TvSeason(fmt.Sprint(season.Tv.TmdbID), fmt.Sprint(season.TmdbID))

	if err != nil {
		return err
	}

	var episodes []models.Episode
	err = svc.db.Model(season).Order("").Association("Episodes").Find(&episodes)

	if err != nil {
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
				}
				continue OUTER
			}
			episodesToInsert = append(episodesToInsert, models.Episode{
				TmdbID:    uint(ep.ID),
				Number:    uint(ep.EpisodeNumber),
				SeasonID:  season.ID,
				Name:      ep.Name,
				Overview:  ep.Overview,
				StillPath: ep.StillPath,
			})
		}
	}

	err = svc.db.Model(season).Association("Episodes").Append(episodesToInsert)

	return err
}

func (svc *TvService) GetTvSeasonEpisodes(season *models.Season) ([]*models.Episode, error) {
	err := svc.SyncTvSeasonEpisodes(season)

	if err != nil {
		return nil, err
	}

	var episodes []*models.Episode
	err = svc.db.Model(season).Association("Episodes").Find(&episodes)

	if err != nil {
		return nil, err
	}

	return episodes, nil
}

func NewTvService(db *gorm.DB, tmdbService *tmdb.Client) *TvService {
	return &TvService{db, tmdbService}
}
