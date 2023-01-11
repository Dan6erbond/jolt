package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Name                   string
	AuthenticationSource   string
	JellyfinAccessToken    string
	Watchlist              []Watchlist
	RecommendationsCreated []Recommendation `gorm:"foreignKey:RecommendationByID"`
	Recommendations        []Recommendation `gorm:"foreignKey:RecommendationForID"`
}
