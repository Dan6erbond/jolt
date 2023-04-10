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

// RateTv is the resolver for the rateTv field.
func (r *mutationResolver) RateTv(ctx context.Context, tmdbID string, rating float64) (*models.Review, error) {
	//nolint:revive
	tmdbId, err := strconv.ParseInt(tmdbID, 10, 64)
	if err != nil {
		return nil, err
	}

	tv, err := r.tvService.GetOrCreateTvByTmdbID(int(tmdbId), true)

	if err != nil {
		return nil, err
	}

	user, err := r.authService.GetUser(ctx)

	if err != nil {
		return nil, err
	}

	return r.reviewService.SaveRating(rating, user, tv)
}

// ReviewTv is the resolver for the reviewTv field.
func (r *mutationResolver) ReviewTv(ctx context.Context, tmdbID string, review string) (*models.Review, error) {
	user, err := r.authService.GetUser(ctx)

	if err != nil {
		return nil, err
	}

	//nolint:revive
	tmdbId, err := strconv.ParseInt(tmdbID, 10, 64)
	if err != nil {
		return nil, err
	}

	tv, err := r.tvService.GetOrCreateTvByTmdbID(int(tmdbId), true)

	if err != nil {
		return nil, err
	}

	return r.reviewService.SaveReview(review, user, tv)
}

// Tv is the resolver for the tv field.
func (r *queryResolver) Tv(ctx context.Context, id *string, tmdbID *string) (*models.Tv, error) {
	if id != nil {
		var tv models.Tv

		//nolint:revive
		dbID, err := strconv.ParseInt(*tmdbID, 10, 64)
		if err != nil {
			return nil, err
		}

		err = r.db.First(&tv, dbID).Error
		if err != nil {
			return nil, err
		}

		return &tv, nil
	}

	if tmdbID == nil {
		return nil, gqlerror.Errorf("one of id and tmdbId must be given")
	}

	//nolint:revive
	tmdbId, err := strconv.ParseInt(*tmdbID, 10, 64)
	if err != nil {
		return nil, err
	}

	tv, err := r.tvService.GetOrCreateTvByTmdbID(int(tmdbId), true)
	if err != nil {
		return nil, err
	}

	return tv, nil
}

// Rating is the resolver for the rating field.
func (r *tvResolver) Rating(ctx context.Context, obj *models.Tv) (float64, error) {
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
func (r *tvResolver) Reviews(ctx context.Context, obj *models.Tv) ([]*models.Review, error) {
	var reviews []*models.Review

	err := r.db.Model(&obj).Association("Reviews").Find(&reviews)

	if err != nil {
		return nil, err
	}

	return reviews, nil
}

// UserReview is the resolver for the userReview field.
func (r *tvResolver) UserReview(ctx context.Context, obj *models.Tv) (*models.Review, error) {
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
func (r *tvResolver) AvailableOnJellyfin(ctx context.Context, obj *models.Tv) (bool, error) {
	panic(fmt.Errorf("not implemented: AvailableOnJellyfin - availableOnJellyfin"))
}

// Genres is the resolver for the genres field.
func (r *tvResolver) Genres(ctx context.Context, obj *models.Tv) ([]string, error) {
	return []string(obj.Genres), nil
}

// Watched is the resolver for the watched field.
func (r *tvResolver) Watched(ctx context.Context, obj *models.Tv) (bool, error) {
	user, err := r.authService.GetUser(ctx)

	if err != nil {
		return false, err
	}

	watchedCount := r.db.Model(&user).Where("media_type = ? AND media_id = ?", "tvs", obj.ID).Association("Watched").Count()

	if watchedCount == 0 {
		return false, nil
	}

	return true, nil
}

// WatchedOn is the resolver for the watchedOn field.
func (r *tvResolver) WatchedOn(ctx context.Context, obj *models.Tv) (*time.Time, error) {
	user, err := r.authService.GetUser(ctx)

	if err != nil {
		return nil, err
	}

	var watched []models.Watched
	err = r.db.Model(&user).Where("media_type = ? AND media_id = ?", "tvs", obj.ID).Association("Watched").Find(&watched)

	if err != nil {
		return nil, err
	}

	if len(watched) == 0 {
		return nil, nil
	}

	return &watched[0].CreatedAt, nil
}

// AddedToWatchlist is the resolver for the addedToWatchlist field.
func (r *tvResolver) AddedToWatchlist(ctx context.Context, obj *models.Tv) (bool, error) {
	user, err := r.authService.GetUser(ctx)

	if err != nil {
		return false, err
	}

	tvCount := r.db.Model(&user).Where("media_type = ? AND media_id = ?", "tv", obj.ID).Association("Watchlist").Count()

	if tvCount > 0 {
		return true, nil
	}

	return false, nil
}

// Tv returns generated.TvResolver implementation.
func (r *Resolver) Tv() generated.TvResolver { return &tvResolver{r} }

type tvResolver struct{ *Resolver }
