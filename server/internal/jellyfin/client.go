package jellyfin

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"net/url"

	"github.com/spf13/viper"
)

var (
	BaseToken  = "MediaBrowser Client=\"Jolt\", Device=\"server\", DeviceId=\"1\", Version=\"0.0.1\""
	EmptyToken = BaseToken + ", Token=\"\""
)

type JellyfinClient struct {
	host string
}

func (jc *JellyfinClient) AuthenticateUserByName(username string, password string) (*AuthenticateUserByNameResult, error) {
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

func NewJellyfinClient() *JellyfinClient {
	return &JellyfinClient{host: viper.GetString("jellyfin.host")}
}
