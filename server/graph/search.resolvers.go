package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/dan6erbond/jolt-server/graph/model"
	"github.com/dan6erbond/jolt-server/internal/tmdb"
)

// Search is the resolver for the search field.
func (r *queryResolver) Search(ctx context.Context, query string, page *int) (*model.SearchResult, error) {
	var results []model.Media

	var _page int
	if page == nil {
		_page = 1
	} else {
		_page = *page
	}

	search, err := r.tmdbService.SearchMulti(query, _page)

	if err != nil {
		return nil, err
	}

	for _, media := range search.Results {
		switch media.MediaType {
		case tmdb.MediaTypeMovie:
			movie, err := r.movieService.GetOrCreateMovieByTmdbID(media.ID)

			if err != nil {
				return nil, err
			}

			results = append(results, movie)
		case tmdb.MediaTypeTv:
			tv, err := r.tvService.GetOrCreateTvByTmdbID(media.ID)

			if err != nil {
				return nil, err
			}

			results = append(results, tv)
		}
	}

	return &model.SearchResult{
		Results:      results,
		Page:         search.Page,
		TotalPages:   search.TotalPages,
		TotalResults: search.TotalResults,
	}, nil
}
