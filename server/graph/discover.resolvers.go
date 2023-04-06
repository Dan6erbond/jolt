package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/dan6erbond/jolt-server/pkg/models"
)

// DiscoverMovies is the resolver for the discoverMovies field.
func (r *queryResolver) DiscoverMovies(ctx context.Context) ([]*models.Movie, error) {
	return r.movieService.GetTmdbDiscoverMovies()
}

// DiscoverTvs is the resolver for the discoverTvs field.
func (r *queryResolver) DiscoverTvs(ctx context.Context) ([]*models.Tv, error) {
	return r.tvService.GetTmdbDiscoverTv()
}
