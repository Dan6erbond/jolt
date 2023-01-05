package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Name  string
	Todos []Todo
}
