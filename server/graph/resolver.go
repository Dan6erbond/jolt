//go:generate go run github.com/99designs/gqlgen generate
package graph

import (
	"github.com/dan6erbond/jolt-server/internal/jellyfin"
	"github.com/dan6erbond/jolt-server/pkg/auth"
	"gorm.io/gorm"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	db             *gorm.DB
	authService    *auth.AuthService
	jellyfinClient *jellyfin.JellyfinClient
}

func NewResolver(db *gorm.DB, as *auth.AuthService, jc *jellyfin.JellyfinClient) *Resolver {
	return &Resolver{db, as, jc}
}
