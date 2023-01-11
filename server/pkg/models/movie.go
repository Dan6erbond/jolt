package models

import "gorm.io/gorm"

type Movie struct {
	gorm.Model
	TmdbID          int
	Recommendations []Recommendation `gorm:"polymorphic:Media;"`
	Watchlists      []Watchlist      `gorm:"polymorphic:Media;"`
	Ratings         []MovieRating
	Reviews         []MovieReview
}

func (m Movie) IsMedia() {}

type MovieRating struct {
	gorm.Model
	MovieID     int
	Movie       Movie
	Rating      float64
	CreatedByID int
	CreatedBy   User
}

type MovieReview struct {
	gorm.Model
	MovieID     int
	Movie       Movie
	Review      string
	CreatedByID int
	CreatedBy   User
}
