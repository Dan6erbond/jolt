package models

import (
	"time"

	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Tv struct {
	gorm.Model
	TmdbID           uint `gorm:"uniqueIndex"`
	SyncedWithTmdb   bool `gorm:"default:false"`
	Name             string
	Overview         string
	Tagline          string
	PosterPath       string
	BackdropPath     string
	Genres           pq.StringArray `gorm:"type:text[]"`
	FirstAirDate     time.Time
	InProduction     bool
	JellyfinID       string
	JellyfinServerID string
	Seasons          []Season
	Recommendations  []Recommendation `gorm:"polymorphic:Media;"`
	Watchlists       []Watchlist      `gorm:"polymorphic:Media;"`
	Watched          []Watched        `gorm:"polymorphic:Media;"`
	Reviews          []Review         `gorm:"polymorphic:Media;"`
}

func (t Tv) IsMedia() {}

type Season struct {
	gorm.Model
	TmdbID           uint `gorm:"uniqueIndex"`
	Number           uint
	SyncedWithTmdb   bool `gorm:"default:false"`
	Name             string
	Overview         string
	PosterPath       string
	JellyfinID       string
	JellyfinServerID string
	TvID             uint
	Tv               Tv
	Episodes         []Episode
	Watched          []Watched `gorm:"polymorphic:Media;"`
}

func (s Season) IsMedia() {}

type Episode struct {
	gorm.Model
	TmdbID           uint `gorm:"uniqueIndex"`
	SyncedWithTmdb   bool `gorm:"default:false"`
	Name             string
	Number           uint
	Overview         string
	StillPath        string
	Runtime          uint
	JellyfinID       string
	JellyfinServerID string
	SeasonID         uint
	Season           Season
	Watched          []Watched `gorm:"polymorphic:Media;"`
}

func (e Episode) IsMedia() {}
