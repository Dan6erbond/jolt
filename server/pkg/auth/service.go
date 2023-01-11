package auth

import (
	"context"
	"fmt"
	"time"

	"github.com/dan6erbond/jolt-server/pkg/models"
	"github.com/golang-jwt/jwt"
	"github.com/spf13/viper"
	"gorm.io/gorm"
)

type AuthService struct {
	db *gorm.DB
}

func (as *AuthService) GenerateAccessToken(user models.User) (*jwt.Token, error) {
	accessTokenClaims := AccessTokenClaims{
		user.Name,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Minute * 15).Unix(),
			Issuer:    "dikurium.ch",
		},
	}

	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, accessTokenClaims)
	return accessToken, nil
}

func (as *AuthService) GenerateRefreshToken(user models.User) (*jwt.Token, error) {
	refreshTokenExpiresAt := time.Now().Add(time.Hour * 24 * 30)
	dbRefreshToken := &models.RefreshToken{ExpiresAt: refreshTokenExpiresAt, Revoked: false, UserID: 1}
	tx := as.db.Create(dbRefreshToken)

	if tx.Error != nil {
		return nil, tx.Error
	}

	refreshTokenClaims := RefreshTokenClaims{
		int(dbRefreshToken.ID),
		jwt.StandardClaims{
			ExpiresAt: refreshTokenExpiresAt.Unix(),
			Issuer:    "dikurium.ch",
		},
	}

	refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, refreshTokenClaims)
	return refreshToken, nil
}

func (as *AuthService) ParseAccessToken(tokenString string) (token *jwt.Token, err error) {
	token, err = jwt.ParseWithClaims(tokenString, &AccessTokenClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(viper.GetString("jwtsecret")), nil
	})
	return token, err
}

func (as *AuthService) GetAccessTokenClaims(token *jwt.Token) (*AccessTokenClaims, error) {
	accessTokenClaims, ok := token.Claims.(*AccessTokenClaims)
	if !ok {
		return nil, fmt.Errorf("couldn't parse token claims")
	}
	return accessTokenClaims, nil
}

func (as *AuthService) ParseRefreshToken(tokenString string) (token *jwt.Token, err error) {
	token, err = jwt.ParseWithClaims(tokenString, &RefreshTokenClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(viper.GetString("jwtsecret")), nil
	})
	return token, err
}

func (as *AuthService) GetRefreshTokenClaims(token *jwt.Token) (*RefreshTokenClaims, error) {
	refreshTokenClaims, ok := token.Claims.(*RefreshTokenClaims)
	if !ok {
		return nil, fmt.Errorf("couldn't parse token claims")
	}
	return refreshTokenClaims, nil
}

func (as *AuthService) ValidateRefreshToken(token *jwt.Token) (valid bool, err error) {
	if token.Valid {
		refreshTokenClaims, err := as.GetRefreshTokenClaims(token)
		if err != nil {
			return false, err
		}
		var refreshToken models.RefreshToken
		as.db.First(&refreshToken, "id = ?", refreshTokenClaims.ID)
		if refreshToken.Revoked {
			return false, fmt.Errorf("refresh token has been revoked")
		}
		return true, nil
	} else if ve, ok := err.(*jwt.ValidationError); ok {
		if ve.Errors&jwt.ValidationErrorMalformed != 0 {
			return false, fmt.Errorf("token malformed")
		} else if ve.Errors&(jwt.ValidationErrorExpired|jwt.ValidationErrorNotValidYet) != 0 {
			return false, fmt.Errorf("token expired or inactive")
		} else {
			return false, fmt.Errorf("couldn't parse token")
		}
	} else {
		return false, fmt.Errorf("couldn't parse token")
	}
}

func (as *AuthService) SignJwtToken(token *jwt.Token) (string, error) {
	signingKey := []byte(viper.GetString("jwtsecret"))
	return token.SignedString(signingKey)
}

func (as *AuthService) GetUser(ctx context.Context) (*models.User, error) {
	accessToken := ForContext(ctx)

	if accessToken == nil {
		return nil, fmt.Errorf("you aren't authenticated")
	}

	claims, err := as.GetAccessTokenClaims(accessToken)

	if err != nil {
		return nil, err
	}

	var user models.User
	tx := as.db.First(&user, "name = ?", claims.Name)
	if tx.Error != nil {
		return nil, tx.Error
	}

	return &user, nil
}

func NewAuthService(db *gorm.DB) (*AuthService, error) {
	return &AuthService{db}, nil
}
