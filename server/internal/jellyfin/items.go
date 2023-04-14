package jellyfin

import "time"

type UserItem struct {
	Name         string    `json:"Name"`
	ServerID     string    `json:"ServerId"`
	ID           string    `json:"Id"`
	HasSubtitles bool      `json:"HasSubtitles,omitempty"`
	Container    string    `json:"Container,omitempty"`
	PremiereDate time.Time `json:"PremiereDate"`
	ExternalUrls []struct {
		Name string `json:"Name"`
		URL  string `json:"Url"`
	} `json:"ExternalUrls"`
	CriticRating    int         `json:"CriticRating,omitempty"`
	OfficialRating  string      `json:"OfficialRating,omitempty"`
	ChannelID       interface{} `json:"ChannelId"`
	CommunityRating float64     `json:"CommunityRating,omitempty"`
	RunTimeTicks    int64       `json:"RunTimeTicks,omitempty"`
	ProductionYear  int         `json:"ProductionYear"`
	IsFolder        bool        `json:"IsFolder"`
	Type            string      `json:"Type"`
	UserData        struct {
		PlaybackPositionTicks int    `json:"PlaybackPositionTicks"`
		PlayCount             int    `json:"PlayCount"`
		IsFavorite            bool   `json:"IsFavorite"`
		Played                bool   `json:"Played"`
		Key                   string `json:"Key"`
	} `json:"UserData"`
	VideoType string `json:"VideoType,omitempty"`
	ImageTags struct {
		Primary string `json:"Primary"`
		Logo    string `json:"Logo"`
	} `json:"ImageTags"`
	BackdropImageTags []string `json:"BackdropImageTags"`
	ImageBlurHashes   struct {
		Backdrop struct {
			Zero4Ce58Ec0468D36458958E181Ae06B4C string `json:"04ce58ec0468d36458958e181ae06b4c"`
		} `json:"Backdrop"`
		Primary struct {
			C43F35090F59405D528727Dbd5F03062 string `json:"c43f35090f59405d528727dbd5f03062"`
		} `json:"Primary"`
		Logo struct {
			F6279634De6389F81633013Eeb3A335B string `json:"f6279634de6389f81633013eeb3a335b"`
		} `json:"Logo"`
	} `json:"ImageBlurHashes"`
	LocationType      string        `json:"LocationType"`
	MediaType         string        `json:"MediaType,omitempty"`
	Status            string        `json:"Status,omitempty"`
	AirDays           []interface{} `json:"AirDays,omitempty"`
	EndDate           time.Time     `json:"EndDate,omitempty"`
	IndexNumber       int           `json:"IndexNumber,omitempty"`
	ParentIndexNumber int           `json:"ParentIndexNumber,omitempty"`
}

type UserItems struct {
	Items            []UserItem `json:"Items"`
	TotalRecordCount int        `json:"TotalRecordCount"`
	StartIndex       int        `json:"StartIndex"`
}
