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
	if tv.SyncedWithTmdb {
		return tv, nil
	}

	tmdbTv, err := svc.tmdbClient.Tv(fmt.Sprint(tv.TmdbID))

	if err != nil {
		return nil, err
	}

	tv.TmdbID = uint(tmdbTv.ID)

	for _, genre := range tmdbTv.Genres {
		tv.Genres = append(tv.Genres, genre.Name)
	}

	tv.Name = tmdbTv.Name
	tv.Overview = tmdbTv.Overview
	tv.Tagline = tmdbTv.Tagline
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
	if len(syncWithTmdb) == 0 || syncWithTmdb[0] == true {
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
	if len(syncWithTmdb) == 0 || syncWithTmdb[0] == true {
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

func NewTvService(db *gorm.DB, tmdbService *tmdb.Client) *TvService {
	return &TvService{db, tmdbService}
}
