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

// CreateTodo is the resolver for the createTodo field.
func (r *mutationResolver) CreateTodo(ctx context.Context, input model.NewTodo) (*models.Todo, error) {
	panic(fmt.Errorf("not implemented: CreateTodo - createTodo"))
}

// Todos is the resolver for the todos field.
func (r *queryResolver) Todos(ctx context.Context) ([]*models.Todo, error) {
	panic(fmt.Errorf("not implemented: Todos - todos"))
}

// ID is the resolver for the id field.
func (r *todoResolver) ID(ctx context.Context, obj *models.Todo) (string, error) {
	panic(fmt.Errorf("not implemented: ID - id"))
}

// User is the resolver for the user field.
func (r *todoResolver) User(ctx context.Context, obj *models.Todo) (*models.User, error) {
	panic(fmt.Errorf("not implemented: User - user"))
}

// Todo returns generated.TodoResolver implementation.
func (r *Resolver) Todo() generated.TodoResolver { return &todoResolver{r} }

type todoResolver struct{ *Resolver }
