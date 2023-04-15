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

const (
	DevAccessTokenValidity = time.Hour * 24
	AccessTokenValidity    = time.Minute * 15
	RefreshTokenValidity   = time.Hour * 24 * 30
)

type Service struct {
	db *gorm.DB
}

func (as *Service) GenerateAccessToken(user models.User) (*jwt.Token, error) {
	var accessTokenExpiry int64

	if viper.GetString("environment") == "development" {
		accessTokenExpiry = time.Now().Add(DevAccessTokenValidity).Unix()
	} else {
		accessTokenExpiry = time.Now().Add(AccessTokenValidity).Unix()
	}

	accessTokenClaims := AccessTokenClaims{
		user.Name,
		jwt.StandardClaims{
			ExpiresAt: accessTokenExpiry,
			Issuer:    "jolt.com",
		},
	}

	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, accessTokenClaims)

	return accessToken, nil
}

func (as *Service) GenerateRefreshToken(user models.User) (*jwt.Token, error) {
	refreshTokenExpiresAt := time.Now().Add(RefreshTokenValidity)
	dbRefreshToken := &models.RefreshToken{ExpiresAt: refreshTokenExpiresAt, Revoked: false, UserID: user.ID}
	tx := as.db.Create(dbRefreshToken)

	if tx.Error != nil {
		return nil, tx.Error
	}

	refreshTokenClaims := RefreshTokenClaims{
		int(dbRefreshToken.ID),
		jwt.StandardClaims{
			ExpiresAt: refreshTokenExpiresAt.Unix(),
			Issuer:    "jolt.com",
		},
	}

	refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, refreshTokenClaims)

	return refreshToken, nil
}

func (as *Service) ParseAccessToken(tokenString string) (token *jwt.Token, err error) {
	token, err = jwt.ParseWithClaims(tokenString, &AccessTokenClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(viper.GetString("jwtsecret")), nil
	})

	return token, err
}

func (as *Service) GetAccessTokenClaims(token *jwt.Token) (*AccessTokenClaims, error) {
	accessTokenClaims, ok := token.Claims.(*AccessTokenClaims)

	if !ok {
		return nil, fmt.Errorf("couldn't parse token claims")
	}

	return accessTokenClaims, nil
}

func (as *Service) ParseRefreshToken(tokenString string) (token *jwt.Token, err error) {
	token, err = jwt.ParseWithClaims(tokenString, &RefreshTokenClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(viper.GetString("jwtsecret")), nil
	})

	return token, err
}

func (as *Service) GetRefreshTokenClaims(token *jwt.Token) (*RefreshTokenClaims, error) {
	refreshTokenClaims, ok := token.Claims.(*RefreshTokenClaims)

	if !ok {
		return nil, fmt.Errorf("couldn't parse token claims")
	}

	return refreshTokenClaims, nil
}

func (as *Service) ValidateRefreshToken(token *jwt.Token) (valid bool, err error) {
	//nolint:nestif
	if token.Valid {
		refreshTokenClaims, err := as.GetRefreshTokenClaims(token)
		if err != nil {
			return false, err
		}

		var refreshToken models.RefreshToken

		err = as.db.First(&refreshToken, "id = ?", refreshTokenClaims.ID).Error
		if err != nil {
			return false, err
		}

		if refreshToken.Revoked {
			return false, fmt.Errorf("refresh token has been revoked")
		}

		return true, nil
	} else if ve, ok := err.(*jwt.ValidationError); ok {
		//nolint:gocritic
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

func (as *Service) SignJwtToken(token *jwt.Token) (string, error) {
	signingKey := []byte(viper.GetString("jwtsecret"))
	return token.SignedString(signingKey)
}

func (as *Service) GetUser(ctx context.Context) (*models.User, error) {
	accessToken := ForContext(ctx)

	if accessToken == nil {
		return nil, fmt.Errorf("you aren't authenticated")
	}

	claims, err := as.GetAccessTokenClaims(accessToken)

	if err != nil {
		return nil, err
	}

	var user models.User

	err = as.db.First(&user, "name = ?", claims.Name).Error
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func NewAuthService(db *gorm.DB) (*Service, error) {
	return &Service{db}, nil
}
