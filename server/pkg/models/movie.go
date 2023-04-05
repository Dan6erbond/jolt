package models

import (
	"time"

	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Movie struct {
	gorm.Model
	TmdbID                   int
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
	Reviews                  []MovieReview
}

func (m Movie) IsMedia() {}

type MovieReview struct {
	gorm.Model
	MovieID     uint
	Movie       Movie
	Review      string
	Rating      float64
	CreatedByID uint
	CreatedBy   User
}
