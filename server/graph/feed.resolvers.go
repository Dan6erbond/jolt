package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/dan6erbond/jolt-server/graph/model"
	"github.com/dan6erbond/jolt-server/pkg/models"
)

// UserFeed is the resolver for the userFeed field.
func (r *queryResolver) UserFeed(ctx context.Context) ([]model.FeedItem, error) {
	user, err := r.authService.GetUser(ctx)

	if err != nil {
		return nil, err
	}

	var recommendations []models.Recommendation

	r.db.Model(user).Association("Recommendations").Find(&recommendations)

	var feedItems []model.FeedItem

	for _, fi := range recommendations {
		feedItems = append(feedItems, fi)
	}

	return feedItems, nil
}
