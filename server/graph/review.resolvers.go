package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/dan6erbond/jolt-server/graph/generated"
	"github.com/dan6erbond/jolt-server/graph/model"
	"github.com/dan6erbond/jolt-server/pkg/models"
)

// Media is the resolver for the media field.
func (r *reviewResolver) Media(ctx context.Context, obj *models.Review) (model.Media, error) {
	switch obj.MediaType {
	case "movies":
		var movie models.Movie
		err := r.db.First(&movie, obj.MediaID).Error
		if err != nil {
			return nil, err
		}
		return movie, nil
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

// Upbolts is the resolver for the upbolts field.
func (r *reviewResolver) Upbolts(ctx context.Context, obj *models.Review) (int, error) {
	panic(fmt.Errorf("not implemented: Upbolts - upbolts"))
}

// UpboltedByCurrentUser is the resolver for the upboltedByCurrentUser field.
func (r *reviewResolver) UpboltedByCurrentUser(ctx context.Context, obj *models.Review) (bool, error) {
	panic(fmt.Errorf("not implemented: UpboltedByCurrentUser - upboltedByCurrentUser"))
}

// CreatedBy is the resolver for the createdBy field.
func (r *reviewResolver) CreatedBy(ctx context.Context, obj *models.Review) (*models.User, error) {
	var createdBy models.User
	err := r.db.Model(&obj).Association("CreatedBy").Find(&createdBy)

	if err != nil {
		return nil, err
	}

	return &createdBy, nil
}

// Review returns generated.ReviewResolver implementation.
func (r *Resolver) Review() generated.ReviewResolver { return &reviewResolver{r} }

type reviewResolver struct{ *Resolver }
