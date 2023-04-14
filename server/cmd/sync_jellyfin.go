/*
Copyright © 2023 NAME HERE <EMAIL ADDRESS>

*/
package cmd

import (
	"github.com/dan6erbond/jolt-server/internal/jellyfin"
	"github.com/dan6erbond/jolt-server/internal/tmdb"
	"github.com/dan6erbond/jolt-server/pkg"
	"github.com/dan6erbond/jolt-server/pkg/services"
	"github.com/spf13/cobra"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	zapgorm "moul.io/zapgorm2"
)

// syncJellyfinCmd represents the syncjellyfin command
var syncJellyfinCmd = &cobra.Command{
	Use:   "jellyfin",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	Run: func(cmd *cobra.Command, args []string) {
		logger := pkg.NewLogger()
		log := zapgorm.New(logger)
		log.SetAsDefault()
		db, err := gorm.Open(postgres.Open(pkg.GetDsn()), &gorm.Config{
			Logger: log,
		})
		if err != nil {
			panic(err)
		}

		movieService := services.NewMovieService(logger, db, tmdb.NewTMDBService())
		tvService := services.NewTvService(db, tmdb.NewTMDBService())
		jc := jellyfin.NewJellyfinClient()

		jellyfinService := services.NewJellyfinService(db, jc, movieService, tvService)
		err = jellyfinService.SyncUsersLibrary()
		if err != nil {
			panic(err)
		}
	},
}

func init() {
	syncCmd.AddCommand(syncJellyfinCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// syncjellyfinCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// syncjellyfinCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
