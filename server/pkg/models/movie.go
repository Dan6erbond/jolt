package models

import (
	"time"

	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Movie struct {
	gorm.Model
	TmdbID                   uint
	SyncedWithTmdb           bool `gorm:"default:false"`
	Title                    string
	Tagline                  string
	PosterPath               string
	BackdropPath             string
	Genres                   pq.StringArray `gorm:"type:text[]"`
	ReleaseDate              time.Time
	Certification            string
	CertificationDoesntExist bool             `gorm:"false"`
	Recommendations          []Recommendation `gorm:"polymorphic:Media;"`
	Watchlists               []Watchlist      `gorm:"polymorphic:Media;"`
	Reviews                  []Review         `gorm:"polymorphic:Media;"`
}

func (m Movie) IsMedia() {}
