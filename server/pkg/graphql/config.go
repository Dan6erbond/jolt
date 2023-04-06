package graphql

import (
	"context"
	"fmt"
	"time"

	"github.com/99designs/gqlgen/graphql"
	"github.com/dan6erbond/jolt-server/graph"
	"github.com/dan6erbond/jolt-server/graph/generated"
	"github.com/dan6erbond/jolt-server/pkg/auth"
	"go.uber.org/zap"
)

func NewConfig(resolver *graph.Resolver, logger *zap.Logger) generated.Config {
	c := generated.Config{Resolvers: resolver}

	c.Directives.LoggedIn = func(ctx context.Context, obj interface{}, next graphql.Resolver) (interface{}, error) {
		accessToken := auth.ForContext(ctx)
		if accessToken == nil {
			return nil, fmt.Errorf("you aren't authenticated")
		}

		return next(ctx)
	}

	c.Directives.Format = func(ctx context.Context, obj interface{}, next graphql.Resolver, format string) (res interface{}, err error) {
		date, ok := obj.(time.Time)

		if !ok {
			return date, nil
		}

		return date.Format(format), nil
	}

	return c
}
