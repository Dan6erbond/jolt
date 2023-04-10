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
	Recommendations []Recommendation `gorm:"polymorphic:Media;"`
	Watchlists      []Watchlist      `gorm:"polymorphic:Media;"`
	Reviews         []Review         `gorm:"polymorphic:Media;"`
}

func (t Tv) IsMedia() {}
