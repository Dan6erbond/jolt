package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"sort"

	"github.com/dan6erbond/jolt-server/pkg/models"
)

// MovieSuggestions is the resolver for the movieSuggestions field.
func (r *queryResolver) MovieSuggestions(ctx context.Context) ([]*models.Movie, error) {
	user, err := r.authService.GetUser(ctx)

	if err != nil {
		return nil, err
	}

	var reviews []models.Review

	err = r.db.Model(&user).
		Order("rating desc").
		Where("rating >= ?", 3).
		Where("media_type = ?", "movies").
		Association("Reviews").
		Find(&reviews)

	if err != nil {
		return nil, err
	}

	var movieReviews []movieReview
	for _, review := range reviews {
		var movie models.Movie
		err = r.db.Find(&movie, review.MediaID).Error

		if err != nil {
			return nil, err
		}

		movieReviews = append(movieReviews, movieReview{&review, &movie})
	}

	recommendations := make(map[int]movieRecommendation)

	for _, movieReview := range movieReviews {
		movieRecommendations, err := r.tmdbService.MovieRecommendations(fmt.Sprint(movieReview.movie.TmdbID))

		if err != nil {
			return nil, err
		}

		for _, movie := range movieRecommendations.Results {
			dbMovie, err := r.movieService.GetOrCreateMovieByTmdbID(movie.ID, true)

			if err != nil {
				return nil, err
			}

			if recommendation, ok := recommendations[movie.ID]; ok {
				recommendations[movie.ID] = movieRecommendation{dbMovie, recommendation.score + int(movieReview.review.Rating)}
			} else {
				recommendations[movie.ID] = movieRecommendation{dbMovie, int(movieReview.review.Rating)}
			}
		}
	}

	movieRecommendations := make([]movieRecommendation, len(recommendations))

	var i int
	for _, recommendation := range recommendations {
		movieRecommendations[i] = recommendation
		i++
	}

	sort.Sort(ByScore(movieRecommendations))

	movies := make([]*models.Movie, len(recommendations))

	for i, movieRecommendation := range movieRecommendations {
		movies[i] = movieRecommendation.movie
	}

	return movies, nil
}

// !!! WARNING !!!
// The code below was going to be deleted when updating resolvers. It has been copied here so you have
// one last chance to move it out of harms way if you want. There are two reasons this happens:
//  - When renaming or deleting a resolver the old code will be put in here. You can safely delete
//    it when you're done.
//  - You have helper methods in this file. Move them out to keep these resolver files clean.
type movieReview struct {
	review *models.Review
	movie  *models.Movie
}
type movieRecommendation struct {
	movie *models.Movie
	score int
}
type ByScore []movieRecommendation

func (r ByScore) Len() int           { return len(r) }
func (r ByScore) Swap(i, j int)      { r[i], r[j] = r[j], r[i] }
func (r ByScore) Less(i, j int) bool { return r[i].score < r[j].score }
