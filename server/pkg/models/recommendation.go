package models

import "gorm.io/gorm"

type Recommendation struct {
	gorm.Model
	Message             string
	RecommendationByID  int
	RecommendationBy    User
	RecommendationForID int
	RecommendationFor   User
	MediaID             int
	MediaType           string
}
