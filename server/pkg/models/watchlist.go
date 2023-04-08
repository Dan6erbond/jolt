package models

import (
	"gorm.io/gorm"
)

type Watchlist struct {
	gorm.Model
	MediaID   uint
	MediaType string
	UserID    uint
	User      User
}
