package pkg

import (
	"github.com/dan6erbond/jolt-server/graph"
	"github.com/dan6erbond/jolt-server/internal/jellyfin"
	"github.com/dan6erbond/jolt-server/pkg/auth"
	"github.com/dan6erbond/jolt-server/pkg/graphql"
	"go.uber.org/fx"
	"go.uber.org/fx/fxevent"
	"go.uber.org/zap"
)

func NewApp() *fx.App {
	app := fx.New(
		fx.Provide(
			NewLogger,
			NewMux,
			NewDb,
			auth.NewAuthService,
			jellyfin.NewJellyfinClient,
			graph.NewResolver,
			graphql.NewConfig,
		),
		fx.Invoke(
			graphql.RegisterRoutes,
			auth.RegisterMiddleware,
		),
		fx.WithLogger(func(log *zap.Logger) fxevent.Logger {
			return &fxevent.ZapLogger{Logger: log}
		}),
	)
	return app
}
