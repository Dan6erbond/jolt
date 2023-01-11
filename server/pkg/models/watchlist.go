package models

import (
	"gorm.io/gorm"
)

type Watchlist struct {
	gorm.Model
	MediaID   int
	MediaType string
	UserID    int
	User      User
}
