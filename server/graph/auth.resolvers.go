package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/dan6erbond/jolt-server/graph/model"
	"github.com/dan6erbond/jolt-server/pkg/models"
)

// SignInWithJellyfin is the resolver for the signInWithJellyfin field.
func (r *mutationResolver) SignInWithJellyfin(ctx context.Context, input model.SignInWithJellyfinInput) (*model.SignInResult, error) {
	res, err := r.jellyfinClient.AuthenticateUserByName(input.Username, input.Password)

	if err != nil {
		return nil, err
	}

	var user models.User

	err = r.db.FirstOrCreate(&user, "name = ?", res.User.Name).Error
	if err != nil {
		return nil, err
	}

	user.Name = res.User.Name
	user.AuthenticationSource = "jellyfin"
	user.JellyfinAccessToken = res.AccessToken
	user.JellyfinUserID = res.User.ID

	err = r.db.Save(user).Error
	if err != nil {
		return nil, err
	}

	_accessToken, err := r.authService.GenerateAccessToken(user)
	if err != nil {
		return nil, err
	}

	accessTokenString, err := r.authService.SignJwtToken(_accessToken)
	if err != nil {
		return nil, err
	}

	refreshToken, err := r.authService.GenerateRefreshToken(user)
	if err != nil {
		return nil, err
	}

	refreshTokenString, err := r.authService.SignJwtToken(refreshToken)
	if err != nil {
		return nil, err
	}

	return &model.SignInResult{
		AccessToken:  accessTokenString,
		RefreshToken: refreshTokenString,
	}, nil
}

// RefreshTokens is the resolver for the refreshTokens field.
func (r *mutationResolver) RefreshTokens(ctx context.Context, refreshToken string) (*model.RefreshTokenResult, error) {
	_refreshToken, err := r.authService.ParseRefreshToken(refreshToken)
	if err != nil {
		return nil, err
	}

	isValid, err := r.authService.ValidateRefreshToken(_refreshToken)
	if err != nil {
		return nil, err
	}

	if !isValid {
		return nil, fmt.Errorf("refresh token invalid")
	}

	refreshTokenClaims, err := r.authService.GetRefreshTokenClaims(_refreshToken)
	if err != nil {
		return nil, err
	}

	var dbRefreshToken models.RefreshToken

	err = r.db.First(&dbRefreshToken, "id = ?", refreshTokenClaims.ID).Error
	if err != nil {
		return nil, err
	}

	var user models.User

	err = r.db.First(&user, dbRefreshToken.UserID).Error
	if err != nil {
		return nil, err
	}

	accessToken, err := r.authService.GenerateAccessToken(user)
	if err != nil {
		return nil, err
	}

	accessTokenString, err := r.authService.SignJwtToken(accessToken)
	if err != nil {
		return nil, err
	}

	newRefreshToken, err := r.authService.GenerateRefreshToken(user)
	if err != nil {
		return nil, err
	}

	refreshTokenString, err := r.authService.SignJwtToken(newRefreshToken)
	if err != nil {
		return nil, err
	}

	dbRefreshToken.Revoked = true
	r.db.Save(&dbRefreshToken)

	return &model.RefreshTokenResult{
		AccessToken:  accessTokenString,
		RefreshToken: refreshTokenString,
	}, nil
}
