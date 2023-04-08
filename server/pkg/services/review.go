package services

import (
	"fmt"

	"github.com/dan6erbond/jolt-server/pkg/models"
	"gorm.io/gorm"
)

type ReviewService struct {
	db *gorm.DB
}

const (
	MaxReview = 5
	MinReview = 1
)

func (rs *ReviewService) SaveRating(rating float64, user *models.User, model interface{}) (*models.Review, error) {
	if rating > MaxReview {
		return nil, fmt.Errorf("rating cannot be higher than 5 stars")
	} else if rating < MinReview {
		return nil, fmt.Errorf("rating must be at least 1 star")
	}

	review, err := rs.GetOrCreateReview(user, model)

	if err != nil {
		return nil, err
	}

	review.Rating = rating

	err = rs.db.Save(&review).Error

	if err != nil {
		return nil, err
	}

	return review, nil
}

func (rs *ReviewService) SaveReview(review string, user *models.User, model interface{}) (*models.Review, error) {
	dbReview, err := rs.GetOrCreateReview(user, model)

	if err != nil {
		return nil, err
	}

	dbReview.Review = review

	err = rs.db.Save(&dbReview).Error

	if err != nil {
		return nil, err
	}

	return dbReview, nil
}

func (rs *ReviewService) GetOrCreateReview(user *models.User, model interface{}) (*models.Review, error) {
	var reviews []models.Review

	err := rs.db.Model(model).Where("created_by_id = ?", user.ID).Association("Reviews").Find(&reviews)

	if err != nil {
		return nil, err
	}

	var review models.Review
	if len(reviews) > 0 {
		review = reviews[0]
	} else {
		review.CreatedByID = user.ID

		err = rs.db.Model(model).Association("Reviews").Append(&review)

		if err != nil {
			return nil, err
		}
	}

	return &review, nil
}

func NewReviewService(db *gorm.DB) *ReviewService {
	return &ReviewService{db}
}
