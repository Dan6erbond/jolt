package tmdb

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"net/url"
	"path"

	"github.com/spf13/viper"
)

var (
	TMDBApiRoot = "https://api.themoviedb.org/3"
)

type Service struct {
	tmdbAPIKey string
}

func (tmdbSvc *Service) SearchMulti(query string) (*SearchMulti, error) {
	u, err := url.Parse(TMDBApiRoot)
	if err != nil {
		return nil, err
	}

	urlQuery := u.Query()
	urlQuery.Add("api_key", tmdbSvc.tmdbAPIKey)
	urlQuery.Add("query", query)

	u.Path += "/search/multi"
	u.RawQuery = urlQuery.Encode()

	resp, err := http.Get(u.String())
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)

	var result SearchMulti

	err = json.Unmarshal(body, &result)
	if err != nil {
		return nil, err
	}

	return &result, nil
}

func (tmdbSvc *Service) DiscoverMovie() (*DiscoverMovie, error) {
	u, err := url.Parse(TMDBApiRoot)
	if err != nil {
		return nil, err
	}

	query := u.Query()
	query.Set("api_key", tmdbSvc.tmdbAPIKey)

	u.Path = path.Join(u.Path, "/discover/movie")
	u.RawQuery = query.Encode()

	resp, err := http.Get(u.String())
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)

	var result DiscoverMovie

	err = json.Unmarshal(body, &result)
	if err != nil {
		return nil, err
	}

	return &result, nil
}

func (tmdbSvc *Service) DiscoverTV() (*DiscoverTV, error) {
	u, err := url.Parse(TMDBApiRoot)
	if err != nil {
		return nil, err
	}

	query := u.Query()
	query.Add("api_key", tmdbSvc.tmdbAPIKey)

	u.Path += "/discover/tv"
	u.RawQuery = query.Encode()

	resp, err := http.Get(u.String())
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)

	var result DiscoverTV

	err = json.Unmarshal(body, &result)
	if err != nil {
		return nil, err
	}

	return &result, nil
}

func (tmdbSvc *Service) Movie(id string) (*Movie, error) {
	u, err := url.Parse(TMDBApiRoot)
	if err != nil {
		return nil, err
	}

	query := u.Query()
	query.Add("api_key", tmdbSvc.tmdbAPIKey)

	u.Path += "/movie/" + id
	u.RawQuery = query.Encode()

	resp, err := http.Get(u.String())
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)

	var result Movie

	err = json.Unmarshal(body, &result)
	if err != nil {
		return nil, err
	}

	return &result, nil
}

func (tmdbSvc *Service) MovieReleaseDates(id string) (*MovieReleaseDates, error) {
	u, err := url.Parse(TMDBApiRoot)
	if err != nil {
		return nil, err
	}

	query := u.Query()
	query.Add("api_key", tmdbSvc.tmdbAPIKey)

	u.Path += "/movie/" + id + "/release_dates"
	u.RawQuery = query.Encode()

	resp, err := http.Get(u.String())
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)

	var result MovieReleaseDates

	err = json.Unmarshal(body, &result)
	if err != nil {
		return nil, err
	}

	return &result, nil
}

func NewTMDBService() *Service {
	apikey := viper.GetString("tmdb.apikey")
	return &Service{tmdbAPIKey: apikey}
}
