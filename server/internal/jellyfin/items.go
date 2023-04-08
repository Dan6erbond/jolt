package jellyfin

import "time"

type Items struct {
	Items []struct {
		Name            string      `json:"Name"`
		ServerID        string      `json:"ServerId"`
		ID              string      `json:"Id"`
		HasSubtitles    bool        `json:"HasSubtitles,omitempty"`
		Container       string      `json:"Container"`
		PremiereDate    time.Time   `json:"PremiereDate"`
		CriticRating    int         `json:"CriticRating,omitempty"`
		OfficialRating  string      `json:"OfficialRating,omitempty"`
		ChannelID       interface{} `json:"ChannelId"`
		CommunityRating float64     `json:"CommunityRating"`
		RunTimeTicks    int64       `json:"RunTimeTicks"`
		ProductionYear  int         `json:"ProductionYear"`
		IsFolder        bool        `json:"IsFolder"`
		Type            string      `json:"Type"`
		UserData        struct {
			PlaybackPositionTicks int    `json:"PlaybackPositionTicks"`
			PlayCount             int    `json:"PlayCount"`
			IsFavorite            bool   `json:"IsFavorite"`
			Played                bool   `json:"Played"`
			Key                   string `json:"Key"`
		} `json:"UserData,omitempty"`
		PrimaryImageAspectRatio float64 `json:"PrimaryImageAspectRatio"`
		VideoType               string  `json:"VideoType"`
		ImageTags               struct {
			Primary string `json:"Primary"`
		} `json:"ImageTags"`
		BackdropImageTags []string `json:"BackdropImageTags"`
		ImageBlurHashes   struct {
			Backdrop struct {
				Four11Ee66B74D194Bdf945364Ff1E1Da99 string `json:"411ee66b74d194bdf945364ff1e1da99"`
			} `json:"Backdrop"`
			Primary struct {
				Eight14Cfdcc0E44Cabdffe7Befe48Bb17A1 string `json:"814cfdcc0e44cabdffe7befe48bb17a1"`
			} `json:"Primary"`
		} `json:"ImageBlurHashes"`
		LocationType string `json:"LocationType"`
		MediaType    string `json:"MediaType"`
	} `json:"Items"`
	TotalRecordCount int `json:"TotalRecordCount"`
	StartIndex       int `json:"StartIndex"`
}
