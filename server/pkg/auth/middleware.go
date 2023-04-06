package auth

import (
	"context"
	"encoding/json"
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt"
	"github.com/gorilla/mux"
)

var jwtTokenCtxKey = &contextKey{"jwtToken"}

type contextKey struct {
	name string
}

func Middleware(as *Service) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			token, ok := r.Header["Authorization"]

			if !ok || len(token) == 0 || token[0] == "" {
				next.ServeHTTP(w, r)
				return
			}

			jwtToken, err := as.ParseAccessToken(strings.Split(token[0], " ")[1])
			if err != nil || !jwtToken.Valid {
				type InvalidTokenError struct {
					Error string `json:"error"`
				}
				httpError, err := json.Marshal(InvalidTokenError{"invalid token"})
				if err != nil {
					panic(err)
				}
				http.Error(w, string(httpError), http.StatusUnauthorized)
				return
			}

			// put it in context
			ctx := context.WithValue(r.Context(), jwtTokenCtxKey, jwtToken)

			// and call the next with our new context
			r = r.WithContext(ctx)
			next.ServeHTTP(w, r)
		})
	}
}

func ForContext(ctx context.Context) *jwt.Token {
	raw, _ := ctx.Value(jwtTokenCtxKey).(*jwt.Token)
	return raw
}

func RegisterMiddleware(router *mux.Router, as *Service) {
	router.Use(Middleware(as))
}
