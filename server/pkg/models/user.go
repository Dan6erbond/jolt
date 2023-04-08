package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Name                   string
	AuthenticationSource   string
	JellyfinAccessToken    string
	JellyfinUserID         string
	Watchlist              []Watchlist
	Watched                []Watched
	RecommendationsCreated []Recommendation `gorm:"foreignKey:RecommendationByID"`
	Recommendations        []Recommendation `gorm:"foreignKey:RecommendationForID"`
	Reviews                []Review         `gorm:"foreignKey:CreatedByID;"`
}
