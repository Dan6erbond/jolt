package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"strconv"

	"github.com/dan6erbond/jolt-server/graph/generated"
	"github.com/dan6erbond/jolt-server/pkg/models"
)

// ID is the resolver for the id field.
func (r *movieResolver) ID(ctx context.Context, obj *models.Movie) (string, error) {
	return fmt.Sprintf("%d", obj.ID), nil
}

// Rating is the resolver for the rating field.
func (r *movieResolver) Rating(ctx context.Context, obj *models.Movie) (float64, error) {
	var ratings []models.MovieRating

	if len(ratings) == 0 {
		return 0, nil
	}

	err := r.db.Model(&obj).Association("Ratings").Find(&ratings)

	if err != nil {
		return 0, err
	}

	var sum float64
	for _, val := range ratings {
		sum += val.Rating
	}

	return sum / float64(len(ratings)), nil
}

// Upbolts is the resolver for the upbolts field.
func (r *movieReviewResolver) Upbolts(ctx context.Context, obj *models.MovieReview) (int, error) {
	panic(fmt.Errorf("not implemented: Upbolts - upbolts"))
}

// UpboltedByCurrentUser is the resolver for the upboltedByCurrentUser field.
func (r *movieReviewResolver) UpboltedByCurrentUser(ctx context.Context, obj *models.MovieReview) (bool, error) {
	panic(fmt.Errorf("not implemented: UpboltedByCurrentUser - upboltedByCurrentUser"))
}

// RateMovie is the resolver for the rateMovie field.
func (r *mutationResolver) RateMovie(ctx context.Context, tmdbID string, rating float64) (*models.MovieRating, error) {
	if rating > 5 {
		return nil, fmt.Errorf("rating cannot be higher than 5 stars")
	} else if rating < 1 {
		return nil, fmt.Errorf("rating must be at least 1 star")
	}

	tmdbId, err := strconv.ParseInt(tmdbID, 10, 64)
	if err != nil {
		return nil, err
	}

	var movie models.Movie
	err = r.db.FirstOrCreate(&movie, "tmdb_id = ?", tmdbId).Error

	if err != nil {
		return nil, err
	}
	movie.TmdbID = int(tmdbId)

	err = r.db.Save(&movie).Error
	if err != nil {
		return nil, err
	}

	user, err := r.authService.GetUser(ctx)

	if err != nil {
		return nil, err
	}

	var movieRatings []models.MovieRating

	err = r.db.Model(&movie).Where("created_by_id = ?", user.ID).Association("Ratings").Find(&movieRatings)

	if err != nil {
		return nil, err
	}

	if len(movieRatings) > 0 {
		movieRating := movieRatings[0]
		movieRating.Rating = rating
		err = r.db.Save(&movieRating).Error

		if err != nil {
			return nil, err
		}

		return &movieRating, nil
	} else {
		movieRating := models.MovieRating{
			Rating:      rating,
			Movie:       movie,
			CreatedByID: int(user.ID),
		}
		err = r.db.Model(&movie).Association("Ratings").Append(&movieRating)

		if err != nil {
			return nil, err
		}

		return &movieRating, nil
	}
}

// ReviewMovie is the resolver for the reviewMovie field.
func (r *mutationResolver) ReviewMovie(ctx context.Context, tmdbID string, review string) (*models.MovieReview, error) {
	panic(fmt.Errorf("not implemented: ReviewMovie - reviewMovie"))
}

// Movie returns generated.MovieResolver implementation.
func (r *Resolver) Movie() generated.MovieResolver { return &movieResolver{r} }

// MovieReview returns generated.MovieReviewResolver implementation.
func (r *Resolver) MovieReview() generated.MovieReviewResolver { return &movieReviewResolver{r} }

type movieResolver struct{ *Resolver }
type movieReviewResolver struct{ *Resolver }
