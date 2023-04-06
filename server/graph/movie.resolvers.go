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

const (
	MaxReview = 5
	MinReview = 1
)

// Rating is the resolver for the rating field.
func (r *movieResolver) Rating(ctx context.Context, obj *models.Movie) (float64, error) {
	var ratings []models.Review

	err := r.db.Model(&obj).Association("Reviews").Find(&ratings)

	if err != nil {
		return 0, err
	}

	var (
		sum        float64
		numRatings int64
	)
	//nolint:wsl
	for _, val := range ratings {
		if val.Rating == 0 {
			continue
		}
		sum += val.Rating
		numRatings++
	}

	var rating float64
	if sum > 0 {
		rating = sum / float64(numRatings)
	} else {
		rating = 0
	}
	return rating, nil
}

// Reviews is the resolver for the reviews field.
func (r *movieResolver) Reviews(ctx context.Context, obj *models.Movie) ([]*models.Review, error) {
	var reviews []*models.Review

	err := r.db.Model(&obj).Association("Reviews").Find(&reviews)

	if err != nil {
		return nil, err
	}

	return reviews, nil
}

// UserReview is the resolver for the userReview field.
func (r *movieResolver) UserReview(ctx context.Context, obj *models.Movie) (*models.Review, error) {
	user, err := r.authService.GetUser(ctx)

	if err != nil {
		return nil, err
	}

	var reviews []models.Review

	err = r.db.Model(&obj).Where("created_by_id = ?", user.ID).Association("Reviews").Find(&reviews)

	if err != nil {
		return nil, err
	}

	if len(reviews) == 0 {
		//nolint:nilnil // nil represents null in GraphQL
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

// RateMovie is the resolver for the rateMovie field.
func (r *mutationResolver) RateMovie(ctx context.Context, tmdbID string, rating float64) (*models.Review, error) {
	if rating > MaxReview {
		return nil, fmt.Errorf("rating cannot be higher than 5 stars")
	} else if rating < MinReview {
		return nil, fmt.Errorf("rating must be at least 1 star")
	}

	//nolint:revive
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

	var movieRatings []models.Review

	err = r.db.Model(&movie).Where("created_by_id = ?", user.ID).Association("Reviews").Find(&movieRatings)

	if err != nil {
		return nil, err
	}

	var movieRating models.Review
	if len(movieRatings) > 0 {
		movieRating = movieRatings[0]
	} else {
		movieRating = models.Review{
			MediaID:     movie.ID,
			MediaType:   "movies",
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
func (r *mutationResolver) ReviewMovie(ctx context.Context, tmdbID string, review string) (*models.Review, error) {
	user, err := r.authService.GetUser(ctx)

	if err != nil {
		return nil, err
	}

	//nolint:revive
	tmdbId, err := strconv.ParseInt(tmdbID, 10, 64)
	if err != nil {
		return nil, err
	}

	movie, err := r.movieService.GetOrCreateMovieByTmdbID(int(tmdbId))

	if err != nil {
		return nil, err
	}

	var reviews []models.Review

	err = r.db.Model(movie).Where("created_by_id = ?", user.ID).Association("Reviews").Find(&reviews)

	if err != nil {
		return nil, err
	}

	var movieReview models.Review
	if len(reviews) > 0 {
		movieReview = reviews[0]
	} else {
		movieReview.CreatedByID = user.ID
		movieReview.MediaType = "movies"
		movieReview.MediaID = movie.ID
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

	//nolint:revive
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

type movieResolver struct{ *Resolver }
