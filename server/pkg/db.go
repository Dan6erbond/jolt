package pkg

import (
	"context"
	"fmt"

	"github.com/dan6erbond/jolt-server/pkg/models"
	"github.com/spf13/viper"
	"go.uber.org/fx"
	"go.uber.org/zap"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	zapgorm "moul.io/zapgorm2"
)

func GetDsn() string {
	return fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%d sslmode=%s",
		viper.GetString("db.host"),
		viper.GetString("db.user"),
		viper.GetString("db.password"),
		viper.GetString("db.database"),
		viper.GetInt("db.port"),
		viper.GetString("db.sslmode"),
	)
}

func NewDb(lc fx.Lifecycle, logger *zap.Logger) *gorm.DB {
	log := zapgorm.New(logger)
	log.SetAsDefault()

	db, err := gorm.Open(postgres.Open(GetDsn()), &gorm.Config{
		Logger: log,
	})
	if err != nil {
		panic(err)
	}

	lc.Append(fx.Hook{
		OnStart: func(context.Context) error {
			logger.Info("Migrating models")
			if err := db.AutoMigrate(&models.User{}); err != nil {
				logger.Error(err.Error())
			}
			if err := db.AutoMigrate(&models.RefreshToken{}); err != nil {
				logger.Error(err.Error())
			}
			if err := db.AutoMigrate(&models.Movie{}); err != nil {
				logger.Error(err.Error())
			}
			if err := db.AutoMigrate(&models.Tv{}); err != nil {
				logger.Error(err.Error())
			}
			if err := db.AutoMigrate(&models.Season{}); err != nil {
				logger.Error(err.Error())
			}
			if err := db.AutoMigrate(&models.Episode{}); err != nil {
				logger.Error(err.Error())
			}
			if err := db.AutoMigrate(&models.Review{}); err != nil {
				logger.Error(err.Error())
			}
			if err := db.AutoMigrate(&models.Watchlist{}); err != nil {
				logger.Error(err.Error())
			}
			if err := db.AutoMigrate(&models.Watched{}); err != nil {
				logger.Error(err.Error())
			}
			if err := db.AutoMigrate(&models.Recommendation{}); err != nil {
				logger.Error(err.Error())
			}
			if err := db.AutoMigrate(&models.Follower{}); err != nil {
				logger.Error(err.Error())
			}
			return nil
		},
	})

	return db
}
