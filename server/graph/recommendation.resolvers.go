package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"strconv"

	"github.com/dan6erbond/jolt-server/graph/generated"
	"github.com/dan6erbond/jolt-server/graph/model"
	"github.com/dan6erbond/jolt-server/pkg/models"
)

// CreateRecommendation is the resolver for the createRecommendation field.
func (r *mutationResolver) CreateRecommendation(ctx context.Context, input model.CreateRecommendationInput) (*models.Recommendation, error) {
	user, err := r.authService.GetUser(ctx)

	if err != nil {
		return nil, err
	}

	//nolint:revive
	tmdbId, err := strconv.ParseInt(input.TmdbID, 10, 64)
	if err != nil {
		return nil, err
	}

	recommendationForID, err := strconv.ParseInt(input.RecommendationForUserID, 10, 64)
	if err != nil {
		return nil, err
	}

	switch input.MediaType {
	case model.MediaTypeMovie:
		movie, err := r.movieService.GetOrCreateMovieByTmdbID(int(tmdbId), true)
		if err != nil {
			return nil, err
		}

		recommendation := models.Recommendation{
			Message:             input.Message,
			RecommendationByID:  user.ID,
			RecommendationForID: uint(recommendationForID),
		}

		err = r.db.Model(&movie).Association("Recommendations").Append(&recommendation)
		if err != nil {
			return nil, err
		}

		return &recommendation, nil
	case model.MediaTypeTv:
		tv, err := r.tvService.GetOrCreateTvByTmdbID(int(tmdbId), true)
		if err != nil {
			return nil, err
		}

		recommendationForID, err := strconv.ParseInt(input.RecommendationForUserID, 10, 64)
		if err != nil {
			return nil, err
		}

		recommendation := models.Recommendation{
			Message:             input.Message,
			RecommendationByID:  user.ID,
			RecommendationForID: uint(recommendationForID),
		}

		err = r.db.Model(&tv).Association("Recommendations").Append(&recommendation)
		if err != nil {
			return nil, err
		}

		return &recommendation, nil
	default:
		panic("unreachable switch clause")
	}
}

// Media is the resolver for the media field.
func (r *recommendationResolver) Media(ctx context.Context, obj *models.Recommendation) (model.Media, error) {
	switch obj.MediaType {
	case "movies":
		var movie models.Movie

		err := r.db.First(&movie, obj.MediaID).Error
		if err != nil {
			return nil, err
		}

		return &movie, nil
	case "tvs":
		var tv models.Tv

		err := r.db.First(&tv, obj.MediaID).Error
		if err != nil {
			return nil, err
		}

		return &tv, nil
	default:
		panic("unreachable switch clause")
	}
}

// RecommendedBy is the resolver for the recommendedBy field.
func (r *recommendationResolver) RecommendedBy(ctx context.Context, obj *models.Recommendation) (*models.User, error) {
	var user models.User
	err := r.db.First(&user, obj.RecommendationByID).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

// RecommendationFor is the resolver for the recommendationFor field.
func (r *recommendationResolver) RecommendationFor(ctx context.Context, obj *models.Recommendation) (*models.User, error) {
	var user models.User
	err := r.db.First(&user, obj.RecommendationForID).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

// Recommendation returns generated.RecommendationResolver implementation.
func (r *Resolver) Recommendation() generated.RecommendationResolver {
	return &recommendationResolver{r}
}

type recommendationResolver struct{ *Resolver }
