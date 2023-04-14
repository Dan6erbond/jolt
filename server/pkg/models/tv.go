package models

import (
	"time"

	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Tv struct {
	gorm.Model
	TmdbID           uint `gorm:"uniqueIndex"`
}

func (t Tv) IsMedia() {}

type Season struct {
	gorm.Model
	TmdbID           uint `gorm:"uniqueIndex"`
}

func (s Season) IsMedia() {}

type Episode struct {
	gorm.Model
	TmdbID           uint `gorm:"uniqueIndex"`
}

func (e Episode) IsMedia() {}
