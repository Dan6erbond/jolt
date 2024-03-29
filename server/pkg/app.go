package pkg

import (
	"github.com/dan6erbond/jolt-server/graph"
	"github.com/dan6erbond/jolt-server/internal/jellyfin"
	"github.com/dan6erbond/jolt-server/internal/tmdb"
	"github.com/dan6erbond/jolt-server/pkg/auth"
	"github.com/dan6erbond/jolt-server/pkg/graphql"
	"github.com/dan6erbond/jolt-server/pkg/services"
	"github.com/gorilla/mux"
	"github.com/spf13/viper"
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
			tmdb.NewTMDBService,
			graph.NewResolver,
			graphql.NewConfig,
			services.NewMovieService,
			services.NewTvService,
			services.NewReviewService,
		),
		fx.Invoke(
			graphql.RegisterRoutes,
			auth.RegisterMiddleware,
			func(r *mux.Router) {
				if viper.GetString("environment") == "production" && viper.GetBool("server.enablefrontend") {
					spa := spaHandler{staticPath: viper.GetString("server.frontendpath"), indexPath: "index.html"}
					r.PathPrefix("/").Handler(spa).Methods("GET")
				}
			},
		),
		fx.WithLogger(func(log *zap.Logger) fxevent.Logger {
			return &fxevent.ZapLogger{Logger: log}
		}),
	)

	return app
}
