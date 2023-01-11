package graphql

import (
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/dan6erbond/jolt-server/graph/generated"
	"github.com/gorilla/mux"
	"go.uber.org/zap"

	"github.com/99designs/gqlgen/graphql/playground"
)

func RegisterRoutes(router *mux.Router, config generated.Config, logger *zap.Logger) {
	srv := handler.NewDefaultServer(generated.NewExecutableSchema(config))

	router.Handle("/", playground.Handler("GraphQL playground", "/graphql")).Methods("GET", "POST", "OPTIONS")
	router.Handle("/graphql", srv).Methods("GET", "POST", "OPTIONS")
}
