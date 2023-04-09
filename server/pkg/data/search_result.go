package data

import (
	"github.com/dan6erbond/jolt-server/graph/model"
	"github.com/dan6erbond/jolt-server/pkg/models"
)

type SearchResult struct {
	Query    string
	Tmdb     *model.TMDBSearchResult `json:"tmdb"`
	Profiles []*models.User          `json:"profiles"`
}
