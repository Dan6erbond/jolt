package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"strconv"

	"github.com/dan6erbond/jolt-server/graph/generated"
	"github.com/dan6erbond/jolt-server/pkg/models"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

// Rating is the resolver for the rating field.
func (r *movieResolver) Rating(ctx context.Context, obj *models.Movie) (float64, error) {
	var ratings []models.MovieReview

	err := r.db.Model(&obj).Association("Reviews").Find(&ratings)

	if err != nil {
		return 0, err
	}

	var sum float64
	for _, val := range ratings {
		sum += val.Rating
	}

	var rating float64
	if sum > 0 {
		rating = sum / float64(len(ratings))
	} else {
		rating = 0
	}
	return rating, nil
}

// Reviews is the resolver for the reviews field.
func (r *movieResolver) Reviews(ctx context.Context, obj *models.Movie) ([]*models.MovieReview, error) {
	var reviews []*models.MovieReview

	err := r.db.Model(&obj).Association("Reviews").Find(&reviews)

	if err != nil {
		return nil, err
	}

	return reviews, nil
}

// UserReview is the resolver for the userReview field.
func (r *movieResolver) UserReview(ctx context.Context, obj *models.Movie) (*models.MovieReview, error) {
	user, err := r.authService.GetUser(ctx)

	if err != nil {
		return nil, err
	}

	var reviews []models.MovieReview

	err = r.db.Model(&obj).Where("created_by_id = ?", user.ID).Association("Reviews").Find(&reviews)

	if err != nil {
		return nil, err
	}

	if len(reviews) == 0 {
		return nil, nil
	}

	return &reviews[0], nil
}

// AvailableOnJellyfin is the resolver for the availableOnJellyfin field.
func (r *movieResolver) AvailableOnJellyfin(ctx context.Context, obj *models.Movie) (bool, error) {
	panic(fmt.Errorf("not implemented: AvailableOnJellyfin - availableOnJellyfin"))
}

// Genres is the resolver for the genres field.
func (r *movieResolver) Genres(ctx context.Context, obj *models.Movie) ([]string, error) {
	return []string(obj.Genres), nil
}

// Movie is the resolver for the movie field.
func (r *movieReviewResolver) Movie(ctx context.Context, obj *models.MovieReview) (*models.Movie, error) {
	var movie models.Movie
	err := r.db.Model(&obj).Association("Movie").Find(&movie)

	if err != nil {
		return nil, err
	}

	return &movie, nil
}

// Upbolts is the resolver for the upbolts field.
func (r *movieReviewResolver) Upbolts(ctx context.Context, obj *models.MovieReview) (int, error) {
	panic(fmt.Errorf("not implemented: Upbolts - upbolts"))
}

// UpboltedByCurrentUser is the resolver for the upboltedByCurrentUser field.
func (r *movieReviewResolver) UpboltedByCurrentUser(ctx context.Context, obj *models.MovieReview) (bool, error) {
	panic(fmt.Errorf("not implemented: UpboltedByCurrentUser - upboltedByCurrentUser"))
}

// CreatedBy is the resolver for the createdBy field.
func (r *movieReviewResolver) CreatedBy(ctx context.Context, obj *models.MovieReview) (*models.User, error) {
	var createdBy models.User
	err := r.db.Model(&obj).Association("CreatedBy").Find(&createdBy)

	if err != nil {
		return nil, err
	}

	return &createdBy, nil
}

// RateMovie is the resolver for the rateMovie field.
func (r *mutationResolver) RateMovie(ctx context.Context, tmdbID string, rating float64) (*models.MovieReview, error) {
	if rating > 5 {
		return nil, fmt.Errorf("rating cannot be higher than 5 stars")
	} else if rating < 1 {
		return nil, fmt.Errorf("rating must be at least 1 star")
	}

	tmdbId, err := strconv.ParseInt(tmdbID, 10, 64)
	if err != nil {
		return nil, err
	}

	movie, err := r.movieService.GetOrCreateMovieByTmdbID(int(tmdbId))

	if err != nil {
		return nil, err
	}

	user, err := r.authService.GetUser(ctx)

	if err != nil {
		return nil, err
	}

	var movieRatings []models.MovieReview

	err = r.db.Model(&movie).Where("created_by_id = ?", user.ID).Association("Reviews").Find(&movieRatings)

	if err != nil {
		return nil, err
	}

	var movieRating models.MovieReview
	if len(movieRatings) > 0 {
		movieRating = movieRatings[0]
	} else {
		movieRating = models.MovieReview{
			MovieID:     movie.ID,
			CreatedByID: user.ID,
		}
	}

	movieRating.Rating = rating

	err = r.db.Save(&movieRating).Error

	if err != nil {
		return nil, err
	}

	return &movieRating, nil
}

// ReviewMovie is the resolver for the reviewMovie field.
func (r *mutationResolver) ReviewMovie(ctx context.Context, tmdbID string, review string) (*models.MovieReview, error) {
	user, err := r.authService.GetUser(ctx)

	if err != nil {
		return nil, err
	}

	tmdbId, err := strconv.ParseInt(tmdbID, 10, 64)
	if err != nil {
		return nil, err
	}

	movie, err := r.movieService.GetOrCreateMovieByTmdbID(int(tmdbId))

	if err != nil {
		return nil, err
	}

	var reviews []models.MovieReview

	err = r.db.Model(movie).Where("created_by_id = ?", user.ID).Association("Reviews").Find(&reviews)

	if err != nil {
		return nil, err
	}

	var movieReview models.MovieReview
	if len(reviews) > 0 {
		movieReview = reviews[0]
	} else {
		movieReview.CreatedByID = user.ID
		movieReview.MovieID = movie.ID
	}

	movieReview.Review = review

	err = r.db.Save(&movieReview).Error

	if err != nil {
		return nil, err
	}

	return &movieReview, nil
}

// Movie is the resolver for the movie field.
func (r *queryResolver) Movie(ctx context.Context, id *string, tmdbID *string) (*models.Movie, error) {
	if id != nil {
		panic(fmt.Errorf("not implemented: Movie - id"))
	}

	if tmdbID == nil {
		return nil, gqlerror.Errorf("one of id and tmdbId must be given")
	}

	tmdbId, err := strconv.ParseInt(*tmdbID, 10, 64)
	if err != nil {
		return nil, err
	}

	movie, err := r.movieService.GetOrCreateMovieByTmdbID(int(tmdbId))
	if err != nil {
		return nil, err
	}

	return movie, nil
}

// Movie returns generated.MovieResolver implementation.
func (r *Resolver) Movie() generated.MovieResolver { return &movieResolver{r} }

// MovieReview returns generated.MovieReviewResolver implementation.
func (r *Resolver) MovieReview() generated.MovieReviewResolver { return &movieReviewResolver{r} }

type movieResolver struct{ *Resolver }
type movieReviewResolver struct{ *Resolver }
