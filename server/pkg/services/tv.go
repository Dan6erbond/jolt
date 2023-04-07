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

func (svc *TvService) GetTmdbDiscoverTv() ([]*models.Tv, error) {
	tv, err := svc.tmdbClient.DiscoverTV()

	if err != nil {
		return nil, err
	}

	tvs, err := svc.SaveTmdbDiscoverTv(tv)

	if err != nil {
		return nil, err
	}

	return tvs, nil
}

func (svc *TvService) SaveTmdbDiscoverTv(tv *tmdb.DiscoverTV) ([]*models.Tv, error) {
	tvs := make([]*models.Tv, len(tv.Results))

	for i, m := range tv.Results {
		dbTv, err := svc.GetOrCreateTvByTmdbID(m.ID)
		if err != nil {
			return nil, err
		}

		tvs[i] = dbTv
	}

	err := svc.db.Save(tvs).Error

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

	for _, genre := range tmdbTv.Genres {
		tv.Genres = append(tv.Genres, genre.Name)
	}

	tv.Name = tmdbTv.Name
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

func (svc *TvService) GetOrCreateTvByTmdbID(tmdbID int) (*models.Tv, error) {
	var tv models.Tv
	err := svc.db.FirstOrCreate(&tv, "tmdb_id = ?", tmdbID).Error

	if err != nil {
		return nil, err
	}

	tv.TmdbID = uint(tmdbID)

	syncedTv, err := svc.SyncTv(&tv)
	if err != nil {
		return nil, err
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