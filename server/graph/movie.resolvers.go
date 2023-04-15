package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"strconv"
	"time"

	"github.com/dan6erbond/jolt-server/graph/generated"
	"github.com/dan6erbond/jolt-server/pkg/models"
	"github.com/vektah/gqlparser/v2/gqlerror"
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

// JellyfinURL is the resolver for the jellyfinUrl field.
func (r *movieResolver) JellyfinURL(ctx context.Context, obj *models.Movie) (*string, error) {
	if obj.JellyfinID == "" {
		//nolint:nilnil
		return nil, nil
	}

	u, err := r.jellyfinClient.GetURL("")

	if err != nil {
		return nil, err
	}

	// TODO: make this cleaner
	jellyfinURL := u.String() + fmt.Sprintf("/web/index.html#!/details?id=%s&serverId=%s", obj.JellyfinID, obj.JellyfinServerID)

	return &jellyfinURL, nil
}

// Genres is the resolver for the genres field.
func (r *movieResolver) Genres(ctx context.Context, obj *models.Movie) ([]string, error) {
	return []string(obj.Genres), nil
}

// Watched is the resolver for the watched field.
func (r *movieResolver) Watched(ctx context.Context, obj *models.Movie) (bool, error) {
	user, err := r.authService.GetUser(ctx)

	watchedCount := r.db.Model(&user).Where("media_type = ? AND media_id = ?", "movies", obj.ID).Association("Watched").Count()

	if err != nil {
		return false, err
	}

	if watchedCount == 0 {
		return false, nil
	}

	return true, nil
}

// WatchedOn is the resolver for the watchedOn field.
func (r *movieResolver) WatchedOn(ctx context.Context, obj *models.Movie) (*time.Time, error) {
	user, err := r.authService.GetUser(ctx)

	if err != nil {
		return nil, err
	}

	var watched []models.Watched
	err = r.db.Model(&user).Where("media_type = ? AND media_id = ?", "movies", obj.ID).Association("Watched").Find(&watched)

	if err != nil {
		return nil, err
	}

	if len(watched) == 0 {
		//nolint:nilnil
		return nil, nil
	}

	return &watched[0].CreatedAt, nil
}

// AddedToWatchlist is the resolver for the addedToWatchlist field.
func (r *movieResolver) AddedToWatchlist(ctx context.Context, obj *models.Movie) (bool, error) {
	user, err := r.authService.GetUser(ctx)

	if err != nil {
		return false, err
	}

	movieCount := r.db.Model(&user).Where("media_type = ? AND media_id = ?", "movies", obj.ID).Association("Watchlist").Count()

	if movieCount > 0 {
		return true, nil
	}

	return false, nil
}

// RateMovie is the resolver for the rateMovie field.
func (r *mutationResolver) RateMovie(ctx context.Context, tmdbID string, rating float64) (*models.Review, error) {
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

	return r.reviewService.SaveRating(rating, user, movie)
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

	return r.reviewService.SaveReview(review, user, movie)
}

// Movie is the resolver for the movie field.
func (r *queryResolver) Movie(ctx context.Context, id *string, tmdbID *string) (*models.Movie, error) {
	if id != nil {
		var movie models.Movie

		//nolint:revive
		dbID, err := strconv.ParseInt(*tmdbID, 10, 64)
		if err != nil {
			return nil, err
		}

		err = r.db.First(&movie, dbID).Error
		if err != nil {
			return nil, err
		}

		return &movie, nil
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
