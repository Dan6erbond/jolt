//go:generate go run github.com/99designs/gqlgen generate
package graph

import (
	"github.com/dan6erbond/jolt-server/internal/jellyfin"
	"github.com/dan6erbond/jolt-server/internal/tmdb"
	"github.com/dan6erbond/jolt-server/pkg/auth"
	"github.com/dan6erbond/jolt-server/pkg/services"
	"gorm.io/gorm"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	db             *gorm.DB
	authService    *auth.Service
	jellyfinClient *jellyfin.Client
	movieService   *services.MovieService
	tmdbService    *tmdb.Service
}

func NewResolver(db *gorm.DB, as *auth.Service, jc *jellyfin.Client, movieService *services.MovieService, tmdbService *tmdb.Service) *Resolver {
	return &Resolver{db, as, jc, movieService, tmdbService}
}
