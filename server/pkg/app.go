package pkg

import (
	"github.com/dan6erbond/jolt-server/graph"
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
			graph.NewResolver,
		),
		fx.Invoke(
			graphql.RegisterRoutes,
		),
		fx.WithLogger(func(log *zap.Logger) fxevent.Logger {
			return &fxevent.ZapLogger{Logger: log}
		}),
	)
	return app
}
