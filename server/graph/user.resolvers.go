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
	if input.MediaType == model.MediaTypeMovie {
		var movie models.Movie
		tx := r.db.FirstOrCreate(&movie, "tmdb_id = ?", input.TmdbID)

		if tx.Error != nil {
			return nil, tx.Error
		}

		tmdbId, err := strconv.ParseInt(input.TmdbID, 10, 64)
		if err != nil {
			return nil, err
		}
		movie.TmdbID = int(tmdbId)

		tx = r.db.Save(&movie)
		if tx.Error != nil {
			return nil, tx.Error
		}

		user, err := r.authService.GetUser(ctx)

		if err != nil {
			return nil, err
		}

		movieCount := r.db.Model(&user).Where("media_type = ? AND media_id = ?", "movies", movie.ID).Association("Watchlist").Count()

		if movieCount > 0 {
			return nil, fmt.Errorf("movie already added to watchlist")
		}

		err = r.db.Model(&user).Association("Watchlist").Append(&models.Watchlist{
			MediaType: "movies",
			MediaID:   int(movie.ID),
		})

		if err != nil {
			return nil, err
		}

		return &movie, nil
	}

	panic("media type TV not implemented")
}

// Me is the resolver for the me field.
func (r *queryResolver) Me(ctx context.Context) (*models.User, error) {
	user, err := r.authService.GetUser(ctx)

	if err != nil {
		return nil, err
	}

	return user, nil
}

// ID is the resolver for the id field.
func (r *userResolver) ID(ctx context.Context, obj *models.User) (string, error) {
	return fmt.Sprintf("%d", obj.ID), nil
}

// Watchlist is the resolver for the watchlist field.
func (r *userResolver) Watchlist(ctx context.Context, obj *models.User) ([]model.Media, error) {
	var medias []model.Media
	var watchlist []models.Watchlist
	err := r.db.Model(obj).Association("Watchlist").Find(&watchlist)
	if err != nil {
		return nil, err
	}
	for _, item := range watchlist {
		if item.MediaType == "movies" {
			var movie models.Movie
			err = r.db.First(&movie, item.MediaID).Error
			if err != nil {
				return nil, err
			}
			medias = append(medias, movie)
		} else {
			panic("media type TV not yet implemented")
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
