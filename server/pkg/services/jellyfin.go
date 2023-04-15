package services

import (
	"errors"
	"fmt"
	"net/url"
	"path"
	"strconv"
	"strings"
	"sync"

	"github.com/dan6erbond/jolt-server/internal/jellyfin"
	"github.com/dan6erbond/jolt-server/pkg/models"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

type JellyfinService struct {
	db             *gorm.DB
	log            *zap.Logger
	jellyfinClient *jellyfin.Client
	movieService   *MovieService
	tvService      *TvService
}

func (svc *JellyfinService) SyncUsersLibrary() error {
	var users []*models.User
	err := svc.db.Where("jellyfin_access_token IS NOT null AND jellyfin_access_token_is_valid = true").Find(&users).Error

	if err != nil {
		return err
	}

	var wg sync.WaitGroup

	for _, user := range users {
		wg.Add(1)
		//nolint:wsl
		go func(user *models.User) {
			err = svc.SyncUserLibrary(&wg, user)
			if err != nil {
				svc.log.Error(err.Error())
			}
		}(user)
	}

	wg.Wait()

	return nil
}

func (svc *JellyfinService) SyncUserLibrary(wg *sync.WaitGroup, user *models.User) error {
	defer wg.Done()

	values := url.Values{}
	values.Add("EnableUserData", "true")
	values.Add("Fields", "ExternalUrls,ExternalSeriesId")
	values.Add("IncludeItemTypes", "Movie,Series")
	values.Add("HasTmdbId", "true")
	values.Add("Recursive", "true")
	values.Add("StartIndex", "0")

	res, err := svc.jellyfinClient.GetUserItems(user.JellyfinAccessToken, user.JellyfinID, values)

	if err != nil && errors.Is(err, jellyfin.ErrUnauthorized) {
		err = svc.db.Model(user).Update("jellyfin_access_token_is_valid", false).Error
		if err != nil {
			panic(err)
		}

		return err
	} else if err != nil {
		panic(err)
	}

	for _, v := range res.Items {
		var externalURL *url.URL
		//nolint:wsl
		for _, u := range v.ExternalUrls {
			//nolint:nestif
			if u.Name == "TheMovieDb" {
				switch v.Type {
				case "Movie":
					if strings.Contains(u.URL, "/movie/") {
						externalURL, err = url.Parse(u.URL)
						if err != nil {
							panic(err)
						}
					}
				case "Series":
					if strings.Contains(u.URL, "/tv/") {
						externalURL, err = url.Parse(u.URL)
						if err != nil {
							panic(err)
						}
					}
				}
			}
		}

		_, tmdbID := path.Split(externalURL.String())
		//nolint:revive
		_tmdbId, err := strconv.ParseInt(tmdbID, 10, 64)

		if err != nil {
			panic(err)
		}

		switch v.Type {
		case "Movie":
			movie, err := svc.movieService.GetOrCreateMovieByTmdbID(int(_tmdbId))

			if err != nil {
				panic(err)
			}

			movie.JellyfinID = v.ID
			movie.JellyfinServerID = v.ServerID
			err = svc.db.Save(&movie).Error

			if err != nil {
				panic(err)
			}

			if v.UserData.Played {
				watchedCount := svc.db.Unscoped().Model(&user).Where("media_type = ? AND media_id = ?", "movies", movie.ID).Association("Watched").Count()

				if err != nil {
					panic(err)
				}

				if watchedCount == 0 {
					err = svc.db.Model(&user).Association("Watched").Append(&models.Watched{MediaType: "movies", MediaID: movie.ID, UserID: user.ID})

					if err != nil {
						panic(err)
					}
				}
			}
		case "Series":
			err = svc.SyncUserShow(user, v, int(_tmdbId))

			if err != nil {
				panic(err)
			}
		default:
			fmt.Println("unexpected media type")
		}
	}

	return nil
}

func (svc *JellyfinService) SyncUserShow(user *models.User, series jellyfin.UserItem, tmdbID int) error {
	tv, err := svc.tvService.GetOrCreateTvByTmdbID(tmdbID)

	if err != nil {
		return err
	}

	tv.JellyfinID = series.ID
	tv.JellyfinServerID = series.ServerID
	err = svc.db.Save(&tv).Error

	if err != nil {
		return err
	}

	if series.UserData.Played {
		watchedCount := svc.db.Unscoped().Model(&user).Where("media_type = ? AND media_id = ?", "tvs", tv.ID).Association("Watched").Count()

		if watchedCount == 0 {
			err = svc.db.Model(&user).Association("Watched").Append(&models.Watched{MediaType: "tvs", MediaID: tv.ID, UserID: user.ID})

			if err != nil {
				return err
			}
		}
	}

	values := url.Values{}
	values.Add("EnableUserData", "true")
	values.Add("UserId", user.JellyfinID)

	seasons, err := svc.jellyfinClient.GetShowSeasons(user.JellyfinAccessToken, tv.JellyfinID, user.JellyfinID, values)

	if err != nil {
		return err
	}

	dbSeasons, err := svc.tvService.GetTvSeasons(tv, false)

	if err != nil {
		return err
	}

SEASONS:
	for _, season := range seasons.Items {
		//nolint:nestif
		for _, dbSeason := range dbSeasons {
			if dbSeason.Number == uint(season.IndexNumber) {
				dbSeason.JellyfinID = season.ID
				dbSeason.JellyfinServerID = season.ServerID
				err = svc.db.Save(dbSeason).Error

				if err != nil {
					fmt.Println("services/jellyfin.go:192")
					return err
				}

				if season.UserData.Played {
					watchedCount := svc.db.Unscoped().Model(&user).Where("media_type = ? AND media_id = ?", "seasons", dbSeason.ID).Association("Watched").Count()

					if err != nil {
						return err
					}

					if watchedCount == 0 {
						err = svc.db.Model(&user).Association("Watched").Append(&models.Watched{MediaType: "seasons", MediaID: dbSeason.ID, UserID: user.ID})

						if err != nil {
							return err
						}
					}
				}

				values := url.Values{}
				values.Add("EnableUserData", "true")
				values.Add("UserId", user.JellyfinID)
				values.Add("Season", fmt.Sprint(season.IndexNumber))

				episodes, err := svc.jellyfinClient.GetShowEpisodes(user.JellyfinAccessToken, series.ID, user.JellyfinID, values)

				if err != nil {
					return err
				}

				dbEpisodes, err := svc.tvService.GetTvSeasonEpisodes(dbSeason, false)

				if err != nil {
					return err
				}

			EPISODES:
				for _, episode := range episodes.Items {
					for _, dbEpisode := range dbEpisodes {
						if dbEpisode.Number == uint(episode.IndexNumber) {
							dbEpisode.JellyfinID = episode.ID
							dbEpisode.JellyfinServerID = episode.ServerID
							err = svc.db.Save(dbEpisode).Error

							if err != nil {
								fmt.Println("services/jellyfin.go:238")
								return err
							}

							if episode.UserData.Played {
								watchedCount := svc.db.Unscoped().Model(&user).Where("media_type = ? AND media_id = ?", "episodes", dbEpisode.ID).Association("Watched").Count()

								if err != nil {
									return err
								}

								if watchedCount == 0 {
									err = svc.db.Model(&user).Association("Watched").Append(&models.Watched{MediaType: "episodes", MediaID: dbEpisode.ID, UserID: user.ID})

									if err != nil {
										return err
									}
								}
							}

							continue EPISODES
						}
					}
				}

				continue SEASONS
			}
		}
	}

	return nil
}

func NewJellyfinService(db *gorm.DB, log *zap.Logger, jc *jellyfin.Client, msvc *MovieService, tvsvc *TvService) *JellyfinService {
	return &JellyfinService{db, log, jc, msvc, tvsvc}
}
