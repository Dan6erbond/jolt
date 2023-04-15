package tmdb

import "time"

type Movie struct {
	Adult               bool   `json:"adult"`
	BackdropPath        string `json:"backdrop_path"`
	BelongsToCollection struct {
		ID           int    `json:"id"`
		Name         string `json:"name"`
		PosterPath   string `json:"poster_path"`
		BackdropPath string `json:"backdrop_path"`
	} `json:"belongs_to_collection"`
	Budget int `json:"budget"`
	Genres []struct {
		ID   int    `json:"id"`
		Name string `json:"name"`
	} `json:"genres"`
	Homepage            string  `json:"homepage"`
	ID                  int     `json:"id"`
	ImdbID              string  `json:"imdb_id"`
	OriginalLanguage    string  `json:"original_language"`
	OriginalTitle       string  `json:"original_title"`
	Overview            string  `json:"overview"`
	Popularity          float64 `json:"popularity"`
	PosterPath          string  `json:"poster_path"`
	ProductionCompanies []struct {
		ID            int    `json:"id"`
		LogoPath      string `json:"logo_path"`
		Name          string `json:"name"`
		OriginCountry string `json:"origin_country"`
	} `json:"production_companies"`
	ProductionCountries []struct {
		Iso31661 string `json:"iso_3166_1"`
		Name     string `json:"name"`
	} `json:"production_countries"`
	ReleaseDate     string `json:"release_date"`
	Revenue         int64  `json:"revenue"`
	Runtime         int    `json:"runtime"`
	SpokenLanguages []struct {
		EnglishName string `json:"english_name"`
		Iso6391     string `json:"iso_639_1"`
		Name        string `json:"name"`
	} `json:"spoken_languages"`
	Status      string  `json:"status"`
	Tagline     string  `json:"tagline"`
	Title       string  `json:"title"`
	Video       bool    `json:"video"`
	VoteAverage float64 `json:"vote_average"`
	VoteCount   int     `json:"vote_count"`
}

type DiscoverMovieResult struct {
	Adult            bool    `json:"adult"`
	BackdropPath     string  `json:"backdrop_path"`
	GenreIds         []int   `json:"genre_ids"`
	ID               int     `json:"id"`
	OriginalLanguage string  `json:"original_language"`
	OriginalTitle    string  `json:"original_title"`
	Overview         string  `json:"overview"`
	Popularity       float64 `json:"popularity"`
	PosterPath       string  `json:"poster_path"`
	ReleaseDate      string  `json:"release_date"`
	Title            string  `json:"title"`
	Video            bool    `json:"video"`
	VoteAverage      float64 `json:"vote_average"`
	VoteCount        int     `json:"vote_count"`
}

type DiscoverMovie struct {
	Page         int                   `json:"page"`
	Results      []DiscoverMovieResult `json:"results"`
	TotalPages   int                   `json:"total_pages"`
	TotalResults int                   `json:"total_results"`
}

type MovieReleaseDates struct {
	ID      int `json:"id"`
	Results []struct {
		Iso31661     string `json:"iso_3166_1"`
		ReleaseDates []struct {
			Certification string        `json:"certification"`
			Descriptors   []interface{} `json:"descriptors"`
			Iso6391       string        `json:"iso_639_1"`
			Note          string        `json:"note"`
			ReleaseDate   time.Time     `json:"release_date"`
			Type          int           `json:"type"`
		} `json:"release_dates"`
	} `json:"results"`
}

type DiscoverTV struct {
	Page    int `json:"page"`
	Results []struct {
		BackdropPath     string   `json:"backdrop_path"`
		FirstAirDate     string   `json:"first_air_date"`
		GenreIds         []int    `json:"genre_ids"`
		ID               int      `json:"id"`
		Name             string   `json:"name"`
		OriginCountry    []string `json:"origin_country"`
		OriginalLanguage string   `json:"original_language"`
		OriginalName     string   `json:"original_name"`
		Overview         string   `json:"overview"`
		Popularity       float64  `json:"popularity"`
		PosterPath       string   `json:"poster_path"`
		VoteAverage      float64  `json:"vote_average"`
		VoteCount        int      `json:"vote_count"`
	} `json:"results"`
	TotalPages   int `json:"total_pages"`
	TotalResults int `json:"total_results"`
}

type SearchMultiResult struct {
	Adult              bool        `json:"adult"`
	BackdropPath       string      `json:"backdrop_path,omitempty"`
	ID                 int         `json:"id"`
	Title              string      `json:"title,omitempty"`
	OriginalLanguage   string      `json:"original_language,omitempty"`
	OriginalTitle      string      `json:"original_title,omitempty"`
	Overview           string      `json:"overview,omitempty"`
	PosterPath         string      `json:"poster_path,omitempty"`
	MediaType          string      `json:"media_type"`
	GenreIds           []int       `json:"genre_ids,omitempty"`
	Popularity         float64     `json:"popularity"`
	ReleaseDate        string      `json:"release_date,omitempty"`
	Video              bool        `json:"video,omitempty"`
	VoteAverage        float64     `json:"vote_average,omitempty"`
	VoteCount          int         `json:"vote_count,omitempty"`
	Name               string      `json:"name,omitempty"`
	OriginalName       string      `json:"original_name,omitempty"`
	Gender             int         `json:"gender,omitempty"`
	KnownForDepartment string      `json:"known_for_department,omitempty"`
	ProfilePath        interface{} `json:"profile_path,omitempty"`
	KnownFor           []struct {
		Adult            bool        `json:"adult"`
		BackdropPath     interface{} `json:"backdrop_path"`
		ID               int         `json:"id"`
		Title            string      `json:"title"`
		OriginalLanguage string      `json:"original_language"`
		OriginalTitle    string      `json:"original_title"`
		Overview         string      `json:"overview"`
		PosterPath       string      `json:"poster_path"`
		MediaType        string      `json:"media_type"`
		GenreIds         []int       `json:"genre_ids"`
		Popularity       float64     `json:"popularity"`
		ReleaseDate      string      `json:"release_date"`
		Video            bool        `json:"video"`
		VoteAverage      float64     `json:"vote_average"`
		VoteCount        int         `json:"vote_count"`
	} `json:"known_for,omitempty"`
	FirstAirDate  string   `json:"first_air_date,omitempty"`
	OriginCountry []string `json:"origin_country,omitempty"`
}

type SearchMulti struct {
	Page         int                 `json:"page"`
	Results      []SearchMultiResult `json:"results"`
	TotalPages   int                 `json:"total_pages"`
	TotalResults int                 `json:"total_results"`
}

type Tv struct {
	Adult        bool   `json:"adult"`
	BackdropPath string `json:"backdrop_path"`
	CreatedBy    []struct {
		ID          int    `json:"id"`
		CreditID    string `json:"credit_id"`
		Name        string `json:"name"`
		Gender      int    `json:"gender"`
		ProfilePath string `json:"profile_path"`
	} `json:"created_by"`
	EpisodeRunTime []int  `json:"episode_run_time"`
	FirstAirDate   string `json:"first_air_date"`
	Genres         []struct {
		ID   int    `json:"id"`
		Name string `json:"name"`
	} `json:"genres"`
	Homepage         string   `json:"homepage"`
	ID               int      `json:"id"`
	InProduction     bool     `json:"in_production"`
	Languages        []string `json:"languages"`
	LastAirDate      string   `json:"last_air_date"`
	LastEpisodeToAir struct {
		ID             int     `json:"id"`
		Name           string  `json:"name"`
		Overview       string  `json:"overview"`
		VoteAverage    float64 `json:"vote_average"`
		VoteCount      int     `json:"vote_count"`
		AirDate        string  `json:"air_date"`
		EpisodeNumber  int     `json:"episode_number"`
		ProductionCode string  `json:"production_code"`
		Runtime        int     `json:"runtime"`
		SeasonNumber   int     `json:"season_number"`
		ShowID         int     `json:"show_id"`
		StillPath      string  `json:"still_path"`
	} `json:"last_episode_to_air"`
	Name             string `json:"name"`
	NextEpisodeToAir struct {
		ID             int         `json:"id"`
		Name           string      `json:"name"`
		Overview       string      `json:"overview"`
		VoteAverage    float64     `json:"vote_average"`
		VoteCount      int         `json:"vote_count"`
		AirDate        string      `json:"air_date"`
		EpisodeNumber  int         `json:"episode_number"`
		ProductionCode string      `json:"production_code"`
		Runtime        interface{} `json:"runtime"`
		SeasonNumber   int         `json:"season_number"`
		ShowID         int         `json:"show_id"`
		StillPath      interface{} `json:"still_path"`
	} `json:"next_episode_to_air"`
	Networks []struct {
		ID            int    `json:"id"`
		LogoPath      string `json:"logo_path"`
		Name          string `json:"name"`
		OriginCountry string `json:"origin_country"`
	} `json:"networks"`
	NumberOfEpisodes    int      `json:"number_of_episodes"`
	NumberOfSeasons     int      `json:"number_of_seasons"`
	OriginCountry       []string `json:"origin_country"`
	OriginalLanguage    string   `json:"original_language"`
	OriginalName        string   `json:"original_name"`
	Overview            string   `json:"overview"`
	Popularity          float64  `json:"popularity"`
	PosterPath          string   `json:"poster_path"`
	ProductionCompanies []struct {
		ID            int         `json:"id"`
		LogoPath      interface{} `json:"logo_path"`
		Name          string      `json:"name"`
		OriginCountry string      `json:"origin_country"`
	} `json:"production_companies"`
	ProductionCountries []struct {
		Iso31661 string `json:"iso_3166_1"`
		Name     string `json:"name"`
	} `json:"production_countries"`
	Seasons []struct {
		AirDate      string `json:"air_date"`
		EpisodeCount int    `json:"episode_count"`
		ID           int    `json:"id"`
		Name         string `json:"name"`
		Overview     string `json:"overview"`
		PosterPath   string `json:"poster_path"`
		SeasonNumber int    `json:"season_number"`
	} `json:"seasons"`
	SpokenLanguages []struct {
		EnglishName string `json:"english_name"`
		Iso6391     string `json:"iso_639_1"`
		Name        string `json:"name"`
	} `json:"spoken_languages"`
	Status      string  `json:"status"`
	Tagline     string  `json:"tagline"`
	Type        string  `json:"type"`
	VoteAverage float64 `json:"vote_average"`
	VoteCount   int     `json:"vote_count"`
}

type TvSeason struct {
	AirDate  string `json:"air_date"`
	Episodes []struct {
		AirDate        string  `json:"air_date"`
		EpisodeNumber  int     `json:"episode_number"`
		ID             int     `json:"id"`
		Name           string  `json:"name"`
		Overview       string  `json:"overview"`
		ProductionCode string  `json:"production_code"`
		Runtime        int     `json:"runtime"`
		SeasonNumber   int     `json:"season_number"`
		ShowID         int     `json:"show_id"`
		StillPath      string  `json:"still_path"`
		VoteAverage    float64 `json:"vote_average"`
		VoteCount      int     `json:"vote_count"`
		Crew           []struct {
			Job                string  `json:"job"`
			Department         string  `json:"department"`
			CreditID           string  `json:"credit_id"`
			Adult              bool    `json:"adult"`
			Gender             int     `json:"gender"`
			ID                 int     `json:"id"`
			KnownForDepartment string  `json:"known_for_department"`
			Name               string  `json:"name"`
			OriginalName       string  `json:"original_name"`
			Popularity         float64 `json:"popularity"`
			ProfilePath        string  `json:"profile_path"`
		} `json:"crew"`
		GuestStars []struct {
			Character          string  `json:"character"`
			CreditID           string  `json:"credit_id"`
			Order              int     `json:"order"`
			Adult              bool    `json:"adult"`
			Gender             int     `json:"gender"`
			ID                 int     `json:"id"`
			KnownForDepartment string  `json:"known_for_department"`
			Name               string  `json:"name"`
			OriginalName       string  `json:"original_name"`
			Popularity         float64 `json:"popularity"`
			ProfilePath        string  `json:"profile_path"`
		} `json:"guest_stars"`
	} `json:"episodes"`
	Name         string `json:"name"`
	Overview     string `json:"overview"`
	ID           int    `json:"id"`
	PosterPath   string `json:"poster_path"`
	SeasonNumber int    `json:"season_number"`
}

type MovieRecommendations struct {
	Page    int `json:"page"`
	Results []struct {
		Adult            bool        `json:"adult"`
		BackdropPath     interface{} `json:"backdrop_path"`
		ID               int         `json:"id"`
		Title            string      `json:"title"`
		OriginalLanguage string      `json:"original_language"`
		OriginalTitle    string      `json:"original_title"`
		Overview         string      `json:"overview"`
		PosterPath       string      `json:"poster_path"`
		MediaType        string      `json:"media_type"`
		GenreIds         []int       `json:"genre_ids"`
		Popularity       float64     `json:"popularity"`
		ReleaseDate      string      `json:"release_date"`
		Video            bool        `json:"video"`
		VoteAverage      float64     `json:"vote_average"`
		VoteCount        int         `json:"vote_count"`
	} `json:"results"`
	TotalPages   int `json:"total_pages"`
	TotalResults int `json:"total_results"`
}
