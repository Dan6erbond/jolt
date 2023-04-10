package jellyfin

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"

	"github.com/spf13/viper"
)

var (
	//nolint:gosec
	BaseToken  = "MediaBrowser Client=\"Jolt\", Device=\"server\", DeviceId=\"1\", Version=\"0.0.1\""
	EmptyToken = BaseToken + ", Token=\"\""
)

var (
	ErrUnauthorized = errors.New("access token not given or invalid")
)

type Client struct {
	host string
}

func (jc *Client) GetURL(path string) (*url.URL, error) {
	u, err := url.Parse(jc.host)
	if err != nil {
		return &url.URL{}, err
	}

	u.Path = path

	return u, nil
}

func (jc *Client) GetUserAuthorization(token string) string {
	return BaseToken + fmt.Sprintf(", Token=\"%s\"", token)
}

func (jc *Client) AuthenticateUserByName(username string, password string) (*AuthenticateUserByNameResult, error) {
	u, err := jc.GetURL("/Users/AuthenticateByName")
	if err != nil {
		return nil, err
	}

	data, err := json.Marshal(AuthenticateUserByNameInput{username, password})
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest(http.MethodPost, u.String(), bytes.NewBuffer(data))
	if err != nil {
		return nil, err
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", EmptyToken)

	client := &http.Client{}

	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)

	var result AuthenticateUserByNameResult

	err = json.Unmarshal(body, &result)
	if err != nil {
		return nil, err
	}

	return &result, nil
}

func (jc *Client) GetUserItems(token string, userID string, query url.Values) (*UserItems, error) {
	u, err := jc.GetURL(fmt.Sprintf("/Users/%s/Items", userID))
	if err != nil {
		return nil, err
	}

	u.RawQuery = query.Encode()

	req, err := http.NewRequest(http.MethodGet, u.String(), nil)
	if err != nil {
		return nil, err
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", jc.GetUserAuthorization(token))

	client := &http.Client{}

	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}

	if resp.StatusCode == http.StatusUnauthorized {
		return nil, ErrUnauthorized
	}

	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)

	var result UserItems

	err = json.Unmarshal(body, &result)
	if err != nil {
		return nil, err
	}

	return &result, nil
}

func NewJellyfinClient() *Client {
	return &Client{host: viper.GetString("jellyfin.host")}
}
