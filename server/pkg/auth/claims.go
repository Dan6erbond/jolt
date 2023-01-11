package auth

import "github.com/golang-jwt/jwt"

type AccessTokenClaims struct {
	Name string `json:"name"`
	jwt.StandardClaims
}

type RefreshTokenClaims struct {
	ID int `json:"id"`
	jwt.StandardClaims
}
