package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"strings"

	"github.com/dan6erbond/jolt-server/graph/generated"
	"github.com/dan6erbond/jolt-server/graph/model"
	"github.com/dan6erbond/jolt-server/internal/tmdb"
	"github.com/dan6erbond/jolt-server/pkg/data"
	"github.com/dan6erbond/jolt-server/pkg/models"
)

// Search is the resolver for the search field.
func (r *queryResolver) Search(ctx context.Context, query string) (*data.SearchResult, error) {
	return &data.SearchResult{
		Query: query,
	}, nil
}

// Tmdb is the resolver for the tmdb field.
func (r *searchResultResolver) Tmdb(ctx context.Context, obj *data.SearchResult, page *int) (*model.TMDBSearchResult, error) {
	var _page int
	if page == nil {
		_page = 1
	} else {
		_page = *page
	}

	search, err := r.tmdbService.SearchMulti(obj.Query, _page)

	if err != nil {
		return nil, err
	}

	mediaChan := make(chan model.Media, len(search.Results))

	for i := range search.Results {
		go func(media tmdb.SearchMultiResult) {
			switch media.MediaType {
			case tmdb.MediaTypeMovie:
				movie, err := r.movieService.GetOrCreateMovieByTmdbID(media.ID, true)

				if err != nil {
					panic(err.Error())
				}

				mediaChan <- movie
			case tmdb.MediaTypeTv:
				tv, err := r.tvService.GetOrCreateTvByTmdbID(media.ID, true)

				if err != nil {
					panic(err.Error())
				}

				mediaChan <- tv
			default:
				mediaChan <- nil
			}
		}(search.Results[i])
	}

	var results []model.Media
	for i := 0; i < len(search.Results); i++ {
		if media := <-mediaChan; media != nil {
			results = append(results, media)
		}
	}

	return &model.TMDBSearchResult{
		Results:      results,
		Page:         search.Page,
		TotalPages:   search.TotalPages,
		TotalResults: search.TotalResults,
	}, nil
}

// Profiles is the resolver for the profiles field.
func (r *searchResultResolver) Profiles(ctx context.Context, obj *data.SearchResult) ([]*models.User, error) {
	var users []*models.User

	r.db.Where("LOWER(name) LIKE ?", "%"+strings.ToLower(obj.Query)+"%").Find(&users)

	return users, nil
}

// SearchResult returns generated.SearchResultResolver implementation.
func (r *Resolver) SearchResult() generated.SearchResultResolver { return &searchResultResolver{r} }

type searchResultResolver struct{ *Resolver }
