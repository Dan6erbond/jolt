package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"strconv"

	"github.com/dan6erbond/jolt-server/graph/generated"
	"github.com/dan6erbond/jolt-server/graph/model"
	"github.com/dan6erbond/jolt-server/pkg/models"
)

// AddToWatchlist is the resolver for the addToWatchlist field.
func (r *mutationResolver) AddToWatchlist(ctx context.Context, input model.AddToWatchlistInput) (model.Media, error) {
	user, err := r.authService.GetUser(ctx)

	if err != nil {
		return nil, err
	}

	//nolint:revive
	tmdbId, err := strconv.ParseInt(input.TmdbID, 10, 64)
	if err != nil {
		return nil, err
	}

	switch input.MediaType {
	case model.MediaTypeMovie:
		movie, err := r.movieService.GetOrCreateMovieByTmdbID(int(tmdbId))

		movieCount := r.db.Model(&user).Where("media_type = ? AND media_id = ?", "movies", movie.ID).Association("Watchlist").Count()

		if movieCount > 0 {
			return nil, fmt.Errorf("movie already added to watchlist")
		}

		err = r.db.Model(&user).Association("Watchlist").Append(&models.Watchlist{
			MediaType: "movies",
			MediaID:   movie.ID,
		})

		if err != nil {
			return nil, err
		}

		return movie, nil
	case model.MediaTypeTv:
		tv, err := r.tvService.GetOrCreateTvByTmdbID(int(tmdbId))

		tvCount := r.db.Model(&user).Where("media_type = ? AND media_id = ?", "tvs", tv.ID).Association("Watchlist").Count()

		if tvCount > 0 {
			return nil, fmt.Errorf("tv already added to watchlist")
		}

		err = r.db.Model(&user).Association("Watchlist").Append(&models.Watchlist{
			MediaType: "tvs",
			MediaID:   tv.ID,
		})

		if err != nil {
			return nil, err
		}

		return tv, nil
	default:
		panic("unreachable switch clause")
	}
}

// RemoveFromWatchlist is the resolver for the removeFromWatchlist field.
func (r *mutationResolver) RemoveFromWatchlist(ctx context.Context, input model.AddToWatchlistInput) (model.Media, error) {
	user, err := r.authService.GetUser(ctx)

	if err != nil {
		return nil, err
	}

	//nolint:revive
	tmdbId, err := strconv.ParseInt(input.TmdbID, 10, 64)
	if err != nil {
		return nil, err
	}

	switch input.MediaType {
	case model.MediaTypeMovie:
		movie, err := r.movieService.GetOrCreateMovieByTmdbID(int(tmdbId))

		var watchlists []models.Watchlist

		err = r.db.Model(&user).Where("media_type = ? AND media_id = ?", "movies", movie.ID).Association("Watchlist").Find(&watchlists)

		if len(watchlists) == 0 {
			return nil, fmt.Errorf("movie not in watchlist")
		}

		err = r.db.Model(&user).Where("media_type = ? AND media_id = ?", "movies", movie.ID).Association("Watchlist").Delete(&watchlists)

		if err != nil {
			return nil, err
		}

		return movie, nil
	case model.MediaTypeTv:
		tv, err := r.tvService.GetOrCreateTvByTmdbID(int(tmdbId))

		var watchlists []models.Watchlist

		err = r.db.Model(&user).Where("media_type = ? AND media_id = ?", "tvs", tv.ID).Association("Watchlist").Find(&watchlists)

		if len(watchlists) == 0 {
			return nil, fmt.Errorf("tv not in watchlist")
		}

		err = r.db.Model(&user).Where("media_type = ? AND media_id = ?", "tvs", tv.ID).Association("Watchlist").Delete(&watchlists)

		if err != nil {
			return nil, err
		}

		return tv, nil
	default:
		panic("unreachable switch clause")
	}
}

// Me is the resolver for the me field.
func (r *queryResolver) Me(ctx context.Context) (*models.User, error) {
	user, err := r.authService.GetUser(ctx)

	if err != nil {
		return nil, err
	}

	return user, nil
}

// Users is the resolver for the users field.
func (r *queryResolver) Users(ctx context.Context) ([]*models.User, error) {
	var users []*models.User

	err := r.db.Find(&users).Error

	if err != nil {
		return nil, err
	}

	return users, nil
}

// Watchlist is the resolver for the watchlist field.
func (r *userResolver) Watchlist(ctx context.Context, obj *models.User) ([]model.Media, error) {
	var medias []model.Media
	//nolint:wsl
	var watchlist []models.Watchlist

	err := r.db.Model(obj).Association("Watchlist").Find(&watchlist)
	if err != nil {
		return nil, err
	}

	for _, item := range watchlist {
		switch item.MediaType {
		case "movies":
			var movie models.Movie

			err = r.db.First(&movie, item.MediaID).Error
			if err != nil {
				return nil, err
			}

			medias = append(medias, movie)
		case "tvs":
			var tv models.Tv

			err = r.db.First(&tv, item.MediaID).Error
			if err != nil {
				return nil, err
			}

			medias = append(medias, tv)
		}
	}
	return medias, nil
}

// Recommendations is the resolver for the recommendations field.
func (r *userResolver) Recommendations(ctx context.Context, obj *models.User) ([]*models.Recommendation, error) {
	var recommendations []*models.Recommendation
	err := r.db.Model(&obj).Association("Recommendations").Find(&recommendations)
	if err != nil {
		return nil, err
	}
	return recommendations, nil
}

// RecommendationsCreated is the resolver for the recommendationsCreated field.
func (r *userResolver) RecommendationsCreated(ctx context.Context, obj *models.User) ([]*models.Recommendation, error) {
	var recommendations []*models.Recommendation
	err := r.db.Model(&obj).Association("RecommendationsCreated").Find(&recommendations)
	if err != nil {
		return nil, err
	}
	return recommendations, nil
}

// User returns generated.UserResolver implementation.
func (r *Resolver) User() generated.UserResolver { return &userResolver{r} }

type userResolver struct{ *Resolver }
