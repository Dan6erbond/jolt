package models

import (
	"gorm.io/gorm"
)

type Follower struct {
	gorm.Model
	UserID     uint
	User       User
	FollowerID uint
	Follower   User
}
