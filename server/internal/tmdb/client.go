package tmdb

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"path"

	"github.com/spf13/viper"
)

var (
	TMDBApiRoot = "https://api.themoviedb.org/3"
)

type Client struct {
	tmdbAPIKey string
}

func (tmdbClient *Client) GetURL(p string) (*url.URL, url.Values, error) {
	u, err := url.Parse(TMDBApiRoot)
	if err != nil {
		return nil, nil, err
	}

	u.Path = path.Join(u.Path, p)

	query := u.Query()
	query.Add("api_key", tmdbClient.tmdbAPIKey)

	u.RawQuery = query.Encode()

	return u, query, nil
}

func (tmdbClient *Client) DoRequest(u *url.URL, res interface{}) error {
	resp, err := http.Get(u.String())
	if err != nil {
		return err
	}

	defer resp.Body.Close()

	err = json.NewDecoder(resp.Body).Decode(res)
	if err != nil {
		return err
	}

	return nil
}

func (tmdbClient *Client) SearchMulti(query string, page int) (*SearchMulti, error) {
	u, urlQuery, err := tmdbClient.GetURL("/search/multi")
	if err != nil {
		return nil, err
	}

	urlQuery.Add("query", query)
	urlQuery.Add("page", fmt.Sprint(page))

	u.RawQuery = urlQuery.Encode()

	var result SearchMulti

	err = tmdbClient.DoRequest(u, &result)
	if err != nil {
		return nil, err
	}

	return &result, nil
}

func (tmdbClient *Client) DiscoverMovie() (*DiscoverMovie, error) {
	u, _, err := tmdbClient.GetURL("/discover/movie")
	if err != nil {
		return nil, err
	}

	var result DiscoverMovie

	err = tmdbClient.DoRequest(u, &result)
	if err != nil {
		return nil, err
	}

	return &result, nil
}

func (tmdbClient *Client) DiscoverTV() (*DiscoverTV, error) {
	u, _, err := tmdbClient.GetURL("/discover/tv")
	if err != nil {
		return nil, err
	}

	var result DiscoverTV

	err = tmdbClient.DoRequest(u, &result)
	if err != nil {
		return nil, err
	}

	return &result, nil
}

func (tmdbClient *Client) Movie(id string) (*Movie, error) {
	u, _, err := tmdbClient.GetURL("/movie/" + id)
	if err != nil {
		return nil, err
	}

	var result Movie

	err = tmdbClient.DoRequest(u, &result)
	if err != nil {
		return nil, err
	}

	return &result, nil
}

func (tmdbClient *Client) MovieReleaseDates(id string) (*MovieReleaseDates, error) {
	u, _, err := tmdbClient.GetURL("/movie/" + id + "/release_dates")
	if err != nil {
		return nil, err
	}

	var result MovieReleaseDates

	err = tmdbClient.DoRequest(u, &result)
	if err != nil {
		return nil, err
	}

	return &result, nil
}

func (tmdbClient *Client) Tv(id string) (*Tv, error) {
	u, _, err := tmdbClient.GetURL("/tv/" + id)
	if err != nil {
		return nil, err
	}

	var result Tv

	err = tmdbClient.DoRequest(u, &result)
	if err != nil {
		return nil, err
	}

	return &result, nil
}

func NewTMDBService() *Client {
	apikey := viper.GetString("tmdb.apikey")
	return &Client{tmdbAPIKey: apikey}
}
