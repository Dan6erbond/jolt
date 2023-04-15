package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Name                       string
	AuthenticationSource       string
	JellyfinAccessToken        string
	JellyfinAccessTokenIsValid bool
	JellyfinID                 string
	Watchlist                  []Watchlist
	Watched                    []Watched
	RecommendationsCreated     []Recommendation `gorm:"foreignKey:RecommendationByID"`
	Recommendations            []Recommendation `gorm:"foreignKey:RecommendationForID"`
	Reviews                    []Review         `gorm:"foreignKey:CreatedByID"`
	Following                  []Follower       `gorm:"foreignKey:FollowerID"`
	Followers                  []Follower       `gorm:"foreignKey:UserID"`
}
