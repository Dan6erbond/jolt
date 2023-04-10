package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"errors"
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
		movie, err := r.movieService.GetOrCreateMovieByTmdbID(int(tmdbId), true)

		if err != nil {
			return nil, err
		}

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
		tv, err := r.tvService.GetOrCreateTvByTmdbID(int(tmdbId), true)

		if err != nil {
			return nil, err
		}

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
		movie, err := r.movieService.GetOrCreateMovieByTmdbID(int(tmdbId), true)

		if err != nil {
			return nil, err
		}

		var watchlists []models.Watchlist

		err = r.db.Model(&user).Where("media_type = ? AND media_id = ?", "movies", movie.ID).Association("Watchlist").Find(&watchlists)

		if err != nil {
			return nil, err
		}

		if len(watchlists) == 0 {
			return nil, fmt.Errorf("movie not in watchlist")
		}

		err = r.db.Model(&user).Where("media_type = ? AND media_id = ?", "movies", movie.ID).Association("Watchlist").Delete(&watchlists)

		if err != nil {
			return nil, err
		}

		return movie, nil
	case model.MediaTypeTv:
		tv, err := r.tvService.GetOrCreateTvByTmdbID(int(tmdbId), true)

		if err != nil {
			return nil, err
		}

		var watchlists []models.Watchlist

		err = r.db.Model(&user).Where("media_type = ? AND media_id = ?", "tvs", tv.ID).Association("Watchlist").Find(&watchlists)

		if err != nil {
			return nil, err
		}

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

// ToggleWatched is the resolver for the toggleWatched field.
func (r *mutationResolver) ToggleWatched(ctx context.Context, input model.ToggleWatchedInput) (model.Media, error) {
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
		movie, err := r.movieService.GetOrCreateMovieByTmdbID(int(tmdbId), true)

		if err != nil {
			return nil, err
		}

		var watched []*models.Watched

		err = r.db.Model(&user).Where("media_type = ? AND media_id = ?", "movies", movie.ID).Association("Watched").Find(&watched)

		if err != nil {
			return nil, err
		}

		if len(watched) == 0 {
			err = r.db.Model(&user).Association("Watched").Append(&models.Watched{MediaType: "movies", MediaID: movie.ID, UserID: user.ID})

			if err != nil {
				return nil, err
			}
		} else {
			r.db.Delete(watched[0])
		}

		return movie, nil
	case model.MediaTypeTv:
		tv, err := r.tvService.GetOrCreateTvByTmdbID(int(tmdbId), true)

		if err != nil {
			return nil, err
		}

		var watched []*models.Watched

		err = r.db.Model(&user).Where("media_type = ? AND media_id = ?", "tvs", tv.ID).Association("Watched").Find(&watched)

		if err != nil {
			return nil, err
		}

		if len(watched) == 0 {
			err = r.db.Model(&user).Association("Watched").Append(&models.Watched{MediaType: "tvs", MediaID: tv.ID, UserID: user.ID})

			if err != nil {
				return nil, err
			}
		} else {
			r.db.Delete(watched[0])
		}

		return tv, nil
	default:
		panic("unreachable default clause")
	}
}

// ToggleFollow is the resolver for the toggleFollow field.
func (r *mutationResolver) ToggleFollow(ctx context.Context, userID string) (*models.User, error) {
	user, err := r.authService.GetUser(ctx)

	if err != nil {
		return nil, err
	}

	var followee models.User
	err = r.db.Find(&followee, "id = ?", userID).Error

	if err != nil {
		return nil, err
	}

	var followers []*models.Follower

	err = r.db.Model(&user).Where("user_id = ?", followee.ID).Association("Following").Find(&followers)

	if err != nil {
		return nil, err
	}

	if len(followers) == 0 {
		err = r.db.Model(&user).Association("Following").Append(&models.Follower{UserID: followee.ID})

		if err != nil {
			return nil, err
		}

		return &followee, nil
	} else {
		err = r.db.Delete(followers[0]).Error

		if err != nil {
			return nil, err
		}

		return &followee, nil
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

// User is the resolver for the user field.
func (r *queryResolver) User(ctx context.Context, id *string, name *string) (*models.User, error) {
	var user models.User
	if id != nil {
		err := r.db.First(&user, "id = ?", id).Error

		if err != nil {
			return nil, err
		}
	} else if name != nil {
		err := r.db.Where("name = ?", name).First(&user).Error

		if err != nil {
			return nil, err
		}
	} else {
		return nil, errors.New("id or name must be given")
	}
	return &user, nil
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

// JellyfinID is the resolver for the jellyfinId field.
func (r *userResolver) JellyfinID(ctx context.Context, obj *models.User) (string, error) {
	return obj.JellyfinUserID, nil
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

// UserFollows is the resolver for the userFollows field.
func (r *userResolver) UserFollows(ctx context.Context, obj *models.User) (bool, error) {
	user, err := r.authService.GetUser(ctx)

	if err != nil {
		return false, err
	}

	followersCount := r.db.Model(&obj).Where("follower_id = ?", user.ID).Association("Followers").Count()

	if followersCount == 0 {
		return false, nil
	} else {
		return true, nil
	}
}

// Followers is the resolver for the followers field.
func (r *userResolver) Followers(ctx context.Context, obj *models.User) ([]*models.User, error) {
	var followers []*models.Follower

	err := r.db.Model(&obj).Preload("Follower").Association("Followers").Find(&followers)

	if err != nil {
		return nil, err
	}

	followerUsers := make([]*models.User, len(followers))

	for i, follower := range followers {
		followerUsers[i] = &follower.Follower
	}

	return followerUsers, nil
}

// Reviews is the resolver for the reviews field.
func (r *userResolver) Reviews(ctx context.Context, obj *models.User) ([]*models.Review, error) {
	var reviews []*models.Review

	err := r.db.Model(&obj).Association("Reviews").Find(&reviews)

	if err != nil {
		return nil, err
	}

	return reviews, nil
}

// User returns generated.UserResolver implementation.
func (r *Resolver) User() generated.UserResolver { return &userResolver{r} }

type userResolver struct{ *Resolver }
