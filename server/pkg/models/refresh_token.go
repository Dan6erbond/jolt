package models

import (
	"time"

	"gorm.io/gorm"
)

type RefreshToken struct {
	gorm.Model
	ExpiresAt time.Time
	Revoked   bool
	UserID    int
}
