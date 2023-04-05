package jellyfin

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"

	"github.com/spf13/viper"
)

var (
	BaseToken  = "MediaBrowser Client=\"Jolt\", Device=\"server\", DeviceId=\"1\", Version=\"0.0.1\""
	EmptyToken = BaseToken + ", Token=\"\""
)

type Client struct {
	host string
}

func (jc *Client) AuthenticateUserByName(username string, password string) (*AuthenticateUserByNameResult, error) {
	u, err := url.Parse(jc.host)
	if err != nil {
		return nil, err
	}

	u.Path = "/Users/AuthenticateByName"

	data, err := json.Marshal(AuthenticateUserByNameInput{username, password})
	if err != nil {
		return nil, err
	}
	req, err := http.NewRequest("POST", u.String(), bytes.NewBuffer(data))
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

func (jc *Client) GetUserAuthorization(token string) string {
	return BaseToken + fmt.Sprintf(", Token=\"%s\"", token)
}

func (jc *Client) GetUserItems(token string, userID string, query url.Values) (*AuthenticateUserByNameResult, error) {
	u, err := url.Parse(jc.host)
	if err != nil {
		return nil, err
	}

	u.Path = fmt.Sprintf("/Users/%s/Items", userID)
	u.RawQuery = query.Encode()

	req, err := http.NewRequest("GET", u.String(), nil)
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
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)

	var result AuthenticateUserByNameResult
	err = json.Unmarshal(body, &result)
	if err != nil {
		return nil, err
	}
	return &result, nil
}

func NewJellyfinClient() *Client {
	return &Client{host: viper.GetString("jellyfin.host")}
}
