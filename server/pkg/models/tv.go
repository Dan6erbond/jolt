package models

import (
	"time"

	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Tv struct {
	gorm.Model
	TmdbID          uint
	SyncedWithTmdb  bool `gorm:"default:false"`
	Name            string
	Overview        string
	Tagline         string
	PosterPath      string
	BackdropPath    string
	Genres          pq.StringArray `gorm:"type:text[]"`
	FirstAirDate    time.Time
	InProduction    bool
	Seasons         []Season
	Recommendations []Recommendation `gorm:"polymorphic:Media;"`
	Watchlists      []Watchlist      `gorm:"polymorphic:Media;"`
	Watched         []Watched        `gorm:"polymorphic:Media;"`
	Reviews         []Review         `gorm:"polymorphic:Media;"`
}

type Season struct {
	gorm.Model
	TmdbID         uint
	Number         uint
	SyncedWithTmdb bool `gorm:"default:false"`
	Name           string
	Overview       string
	PosterPath     string
	TvID           uint
	Tv             Tv
	Episodes       []Episode
}

type Episode struct {
	gorm.Model
	TmdbID         uint
	SyncedWithTmdb bool `gorm:"default:false"`
	Name           string
	Number         uint
	Overview       string
	StillPath      string
	Runtime        uint
	SeasonID       uint
	Season         Season
}

func (t Tv) IsMedia() {}
