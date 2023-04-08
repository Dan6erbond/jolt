package models

import "gorm.io/gorm"

type Recommendation struct {
	gorm.Model
	Message             string
	RecommendationByID  uint
	RecommendationBy    User
	RecommendationForID uint
	RecommendationFor   User
	MediaID             uint
	MediaType           string
}

func (r Recommendation) IsFeedItem() {}
