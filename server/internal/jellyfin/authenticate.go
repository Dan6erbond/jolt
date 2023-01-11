package jellyfin

import "time"

type AuthenticateUserByNameInput struct {
	Username string `json:"Username"`
	Password string `json:"Pw"`
}

type AuthenticateUserByNameResult struct {
	User struct {
		Name                      string    `json:"Name"`
		ServerID                  string    `json:"ServerId"`
		ID                        string    `json:"Id"`
		PrimaryImageTag           string    `json:"PrimaryImageTag"`
		HasPassword               bool      `json:"HasPassword"`
		HasConfiguredPassword     bool      `json:"HasConfiguredPassword"`
		HasConfiguredEasyPassword bool      `json:"HasConfiguredEasyPassword"`
		EnableAutoLogin           bool      `json:"EnableAutoLogin"`
		LastLoginDate             time.Time `json:"LastLoginDate"`
		LastActivityDate          time.Time `json:"LastActivityDate"`
		Configuration             struct {
			PlayDefaultAudioTrack      bool          `json:"PlayDefaultAudioTrack"`
			SubtitleLanguagePreference string        `json:"SubtitleLanguagePreference"`
			DisplayMissingEpisodes     bool          `json:"DisplayMissingEpisodes"`
			GroupedFolders             []interface{} `json:"GroupedFolders"`
			SubtitleMode               string        `json:"SubtitleMode"`
			DisplayCollectionsView     bool          `json:"DisplayCollectionsView"`
			EnableLocalPassword        bool          `json:"EnableLocalPassword"`
			OrderedViews               []interface{} `json:"OrderedViews"`
			LatestItemsExcludes        []interface{} `json:"LatestItemsExcludes"`
			MyMediaExcludes            []interface{} `json:"MyMediaExcludes"`
			HidePlayedInLatest         bool          `json:"HidePlayedInLatest"`
			RememberAudioSelections    bool          `json:"RememberAudioSelections"`
			RememberSubtitleSelections bool          `json:"RememberSubtitleSelections"`
			EnableNextEpisodeAutoPlay  bool          `json:"EnableNextEpisodeAutoPlay"`
		} `json:"Configuration"`
		Policy struct {
			IsAdministrator                  bool          `json:"IsAdministrator"`
			IsHidden                         bool          `json:"IsHidden"`
			IsDisabled                       bool          `json:"IsDisabled"`
			BlockedTags                      []interface{} `json:"BlockedTags"`
			EnableUserPreferenceAccess       bool          `json:"EnableUserPreferenceAccess"`
			AccessSchedules                  []interface{} `json:"AccessSchedules"`
			BlockUnratedItems                []interface{} `json:"BlockUnratedItems"`
			EnableRemoteControlOfOtherUsers  bool          `json:"EnableRemoteControlOfOtherUsers"`
			EnableSharedDeviceControl        bool          `json:"EnableSharedDeviceControl"`
			EnableRemoteAccess               bool          `json:"EnableRemoteAccess"`
			EnableLiveTvManagement           bool          `json:"EnableLiveTvManagement"`
			EnableLiveTvAccess               bool          `json:"EnableLiveTvAccess"`
			EnableMediaPlayback              bool          `json:"EnableMediaPlayback"`
			EnableAudioPlaybackTranscoding   bool          `json:"EnableAudioPlaybackTranscoding"`
			EnableVideoPlaybackTranscoding   bool          `json:"EnableVideoPlaybackTranscoding"`
			EnablePlaybackRemuxing           bool          `json:"EnablePlaybackRemuxing"`
			ForceRemoteSourceTranscoding     bool          `json:"ForceRemoteSourceTranscoding"`
			EnableContentDeletion            bool          `json:"EnableContentDeletion"`
			EnableContentDeletionFromFolders []interface{} `json:"EnableContentDeletionFromFolders"`
			EnableContentDownloading         bool          `json:"EnableContentDownloading"`
			EnableSyncTranscoding            bool          `json:"EnableSyncTranscoding"`
			EnableMediaConversion            bool          `json:"EnableMediaConversion"`
			EnabledDevices                   []interface{} `json:"EnabledDevices"`
			EnableAllDevices                 bool          `json:"EnableAllDevices"`
			EnabledChannels                  []interface{} `json:"EnabledChannels"`
			EnableAllChannels                bool          `json:"EnableAllChannels"`
			EnabledFolders                   []interface{} `json:"EnabledFolders"`
			EnableAllFolders                 bool          `json:"EnableAllFolders"`
			InvalidLoginAttemptCount         int           `json:"InvalidLoginAttemptCount"`
			LoginAttemptsBeforeLockout       int           `json:"LoginAttemptsBeforeLockout"`
			MaxActiveSessions                int           `json:"MaxActiveSessions"`
			EnablePublicSharing              bool          `json:"EnablePublicSharing"`
			BlockedMediaFolders              []interface{} `json:"BlockedMediaFolders"`
			BlockedChannels                  []interface{} `json:"BlockedChannels"`
			RemoteClientBitrateLimit         int           `json:"RemoteClientBitrateLimit"`
			AuthenticationProviderID         string        `json:"AuthenticationProviderId"`
			PasswordResetProviderID          string        `json:"PasswordResetProviderId"`
			SyncPlayAccess                   string        `json:"SyncPlayAccess"`
		} `json:"Policy"`
	} `json:"User"`
	SessionInfo struct {
		PlayState struct {
			CanSeek    bool   `json:"CanSeek"`
			IsPaused   bool   `json:"IsPaused"`
			IsMuted    bool   `json:"IsMuted"`
			RepeatMode string `json:"RepeatMode"`
		} `json:"PlayState"`
		AdditionalUsers []interface{} `json:"AdditionalUsers"`
		Capabilities    struct {
			PlayableMediaTypes           []interface{} `json:"PlayableMediaTypes"`
			SupportedCommands            []interface{} `json:"SupportedCommands"`
			SupportsMediaControl         bool          `json:"SupportsMediaControl"`
			SupportsContentUploading     bool          `json:"SupportsContentUploading"`
			SupportsPersistentIdentifier bool          `json:"SupportsPersistentIdentifier"`
			SupportsSync                 bool          `json:"SupportsSync"`
		} `json:"Capabilities"`
		RemoteEndPoint           string        `json:"RemoteEndPoint"`
		PlayableMediaTypes       []interface{} `json:"PlayableMediaTypes"`
		ID                       string        `json:"Id"`
		UserID                   string        `json:"UserId"`
		UserName                 string        `json:"UserName"`
		Client                   string        `json:"Client"`
		LastActivityDate         time.Time     `json:"LastActivityDate"`
		LastPlaybackCheckIn      time.Time     `json:"LastPlaybackCheckIn"`
		DeviceName               string        `json:"DeviceName"`
		DeviceID                 string        `json:"DeviceId"`
		ApplicationVersion       string        `json:"ApplicationVersion"`
		IsActive                 bool          `json:"IsActive"`
		SupportsMediaControl     bool          `json:"SupportsMediaControl"`
		SupportsRemoteControl    bool          `json:"SupportsRemoteControl"`
		NowPlayingQueue          []interface{} `json:"NowPlayingQueue"`
		NowPlayingQueueFullItems []interface{} `json:"NowPlayingQueueFullItems"`
		HasCustomDeviceName      bool          `json:"HasCustomDeviceName"`
		ServerID                 string        `json:"ServerId"`
		UserPrimaryImageTag      string        `json:"UserPrimaryImageTag"`
		SupportedCommands        []interface{} `json:"SupportedCommands"`
	} `json:"SessionInfo"`
	AccessToken string `json:"AccessToken"`
	ServerID    string `json:"ServerId"`
}
