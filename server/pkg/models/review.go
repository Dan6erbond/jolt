package models

import "gorm.io/gorm"

type Review struct {
	gorm.Model
	MediaID     uint
	MediaType   string
	Review      string
	Rating      float64
	CreatedByID uint
	CreatedBy   User
}
