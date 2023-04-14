package jellyfin

import "time"

type ShowSeasons struct {
	Items []struct {
		Name                    string      `json:"Name"`
		ServerID                string      `json:"ServerId"`
		ID                      string      `json:"Id"`
		PremiereDate            time.Time   `json:"PremiereDate"`
		ChannelID               interface{} `json:"ChannelId"`
		ProductionYear          int         `json:"ProductionYear"`
		IndexNumber             int         `json:"IndexNumber"`
		IsFolder                bool        `json:"IsFolder"`
		Type                    string      `json:"Type"`
		ParentLogoItemID        string      `json:"ParentLogoItemId"`
		ParentBackdropItemID    string      `json:"ParentBackdropItemId"`
		ParentBackdropImageTags []string    `json:"ParentBackdropImageTags"`
		UserData                struct {
			UnplayedItemCount     int    `json:"UnplayedItemCount"`
			PlaybackPositionTicks int    `json:"PlaybackPositionTicks"`
			PlayCount             int    `json:"PlayCount"`
			IsFavorite            bool   `json:"IsFavorite"`
			Played                bool   `json:"Played"`
			Key                   string `json:"Key"`
		} `json:"UserData"`
		SeriesName            string `json:"SeriesName"`
		SeriesID              string `json:"SeriesId"`
		SeriesPrimaryImageTag string `json:"SeriesPrimaryImageTag"`
		ImageTags             struct {
			Primary string `json:"Primary"`
		} `json:"ImageTags"`
		BackdropImageTags  []interface{} `json:"BackdropImageTags"`
		ParentLogoImageTag string        `json:"ParentLogoImageTag"`
		ImageBlurHashes    struct {
			Primary struct {
				Cd43A7Ef741Fe2774858E6A4Cd02Bbb4   string `json:"cd43a7ef741fe2774858e6a4cd02bbb4"`
				One6156B1399A795B81153B6C658Ef2361 string `json:"16156b1399a795b81153b6c658ef2361"`
			} `json:"Primary"`
			Logo struct {
				TwoA5Fb8Ee57Fc6D08A9D74B0254Aa7680 string `json:"2a5fb8ee57fc6d08a9d74b0254aa7680"`
			} `json:"Logo"`
			Backdrop struct {
				Six0E599E9E8A1A88680Bfbf4Aa692Dfd8 string `json:"60e599e9e8a1a88680bfbf4aa692dfd8"`
			} `json:"Backdrop"`
		} `json:"ImageBlurHashes"`
		LocationType string `json:"LocationType"`
	} `json:"Items"`
	TotalRecordCount int `json:"TotalRecordCount"`
	StartIndex       int `json:"StartIndex"`
}

type ShowEpisodes struct {
	Items []struct {
		Name                    string      `json:"Name"`
		ServerID                string      `json:"ServerId"`
		ID                      string      `json:"Id"`
		HasSubtitles            bool        `json:"HasSubtitles"`
		Container               string      `json:"Container"`
		PremiereDate            time.Time   `json:"PremiereDate"`
		ChannelID               interface{} `json:"ChannelId"`
		CommunityRating         int         `json:"CommunityRating"`
		RunTimeTicks            int64       `json:"RunTimeTicks"`
		ProductionYear          int         `json:"ProductionYear"`
		IndexNumber             int         `json:"IndexNumber"`
		ParentIndexNumber       int         `json:"ParentIndexNumber"`
		IsFolder                bool        `json:"IsFolder"`
		Type                    string      `json:"Type"`
		ParentLogoItemID        string      `json:"ParentLogoItemId"`
		ParentBackdropItemID    string      `json:"ParentBackdropItemId"`
		ParentBackdropImageTags []string    `json:"ParentBackdropImageTags"`
		UserData                struct {
			PlaybackPositionTicks int    `json:"PlaybackPositionTicks"`
			PlayCount             int    `json:"PlayCount"`
			IsFavorite            bool   `json:"IsFavorite"`
			Played                bool   `json:"Played"`
			Key                   string `json:"Key"`
		} `json:"UserData"`
		SeriesName            string `json:"SeriesName"`
		SeriesID              string `json:"SeriesId"`
		SeasonID              string `json:"SeasonId"`
		SeriesPrimaryImageTag string `json:"SeriesPrimaryImageTag"`
		SeasonName            string `json:"SeasonName"`
		VideoType             string `json:"VideoType"`
		ImageTags             struct {
			Primary string `json:"Primary"`
		} `json:"ImageTags"`
		BackdropImageTags  []interface{} `json:"BackdropImageTags"`
		ParentLogoImageTag string        `json:"ParentLogoImageTag"`
		ImageBlurHashes    struct {
			Primary struct {
				Two78A6100C317Bc7642Ea031684E44798 string `json:"278a6100c317bc7642ea031684e44798"`
				One6156B1399A795B81153B6C658Ef2361 string `json:"16156b1399a795b81153b6c658ef2361"`
			} `json:"Primary"`
			Logo struct {
				TwoA5Fb8Ee57Fc6D08A9D74B0254Aa7680 string `json:"2a5fb8ee57fc6d08a9d74b0254aa7680"`
			} `json:"Logo"`
			Backdrop struct {
				Six0E599E9E8A1A88680Bfbf4Aa692Dfd8 string `json:"60e599e9e8a1a88680bfbf4aa692dfd8"`
			} `json:"Backdrop"`
		} `json:"ImageBlurHashes"`
		LocationType string `json:"LocationType"`
		MediaType    string `json:"MediaType"`
	} `json:"Items"`
	TotalRecordCount int `json:"TotalRecordCount"`
	StartIndex       int `json:"StartIndex"`
}
