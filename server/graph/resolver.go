//go:generate go run github.com/99designs/gqlgen generate
package graph

import "gorm.io/gorm"

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct{ db *gorm.DB }

func NewResolver(db *gorm.DB) *Resolver {
	return &Resolver{db}
}
