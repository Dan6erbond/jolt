package models

import "gorm.io/gorm"

type Todo struct {
	gorm.Model
	Text   string
	Done   bool
	UserID int
	User   User
}
