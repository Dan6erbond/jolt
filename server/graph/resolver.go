//go:generate go run github.com/99designs/gqlgen generate
package graph

import (
	"github.com/dan6erbond/jolt-server/internal/jellyfin"
	"github.com/dan6erbond/jolt-server/internal/tmdb"
	"github.com/dan6erbond/jolt-server/pkg/auth"
	"github.com/dan6erbond/jolt-server/pkg/services"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	db             *gorm.DB
	authService    *auth.Service
	jellyfinClient *jellyfin.Client
	tmdbService    *tmdb.Client
	movieService   *services.MovieService
	tvService      *services.TvService
	reviewService  *services.ReviewService
	log            *zap.Logger
}

func NewResolver(
	log *zap.Logger,
	db *gorm.DB,
	as *auth.Service,
	jc *jellyfin.Client,
	tmdbService *tmdb.Client,
	movieService *services.MovieService,
	tvService *services.TvService,
	reviewService *services.ReviewService,
) *Resolver {
	return &Resolver{
		db,
		as,
		jc,
		tmdbService,
		movieService,
		tvService,
		reviewService,
		log,
	}
}
