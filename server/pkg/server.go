package pkg

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"github.com/spf13/viper"
	"go.uber.org/fx"
	"go.uber.org/zap"
)

const ReadHeaderTimeoutSeconds = 3

func NewMux(lc fx.Lifecycle, logger *zap.Logger) *mux.Router {
	logger.Info("Executing NewMux.")

	r := mux.NewRouter()

	r.Use(cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
		AllowedHeaders:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "HEAD", "OPTIONS"},
		Debug:            true,
	}).Handler)

	server := &http.Server{
		Addr:              fmt.Sprintf("%s:%s", viper.GetString("server.host"), viper.GetString("server.port")),
		Handler:           r,
		ReadHeaderTimeout: time.Duration(time.Duration(ReadHeaderTimeoutSeconds).Seconds()),
	}

	lc.Append(fx.Hook{
		OnStart: func(context.Context) error {
			logger.Info("Starting HTTP server.")
			go func() {
				if err := server.ListenAndServe(); err != nil {
					logger.Sugar().Error(err)
				}
			}()
			return nil
		},
		OnStop: func(ctx context.Context) error {
			logger.Info("Stopping HTTP server.")
			return server.Shutdown(ctx)
		},
	})

	return r
}
