package models

import (
	"time"

	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Movie struct {
	gorm.Model
	TmdbID                   uint `gorm:"uniqueIndex"`
	SyncedWithTmdb           bool `gorm:"default:false"`
	Title                    string
	Tagline                  string
	Overview                 string
	PosterPath               string
	BackdropPath             string
	Genres                   pq.StringArray `gorm:"type:text[]"`
	ReleaseDate              time.Time
	Certification            string
	CertificationDoesntExist bool `gorm:"false"`
	JellyfinID               string
	JellyfinServerID         string
	Recommendations          []Recommendation `gorm:"polymorphic:Media;"`
	Watchlists               []Watchlist      `gorm:"polymorphic:Media;"`
	Watched                  []Watched        `gorm:"polymorphic:Media;"`
	Reviews                  []Review         `gorm:"polymorphic:Media;"`
}

func (m Movie) IsMedia() {}
