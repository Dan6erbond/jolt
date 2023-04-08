package models

import "gorm.io/gorm"

type Watched struct {
	gorm.Model
	MediaID   uint
	MediaType string
	UserID    uint
	User      User
}
