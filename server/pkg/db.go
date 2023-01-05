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

func NewDb(lc fx.Lifecycle, logger *zap.Logger) *gorm.DB {
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%d sslmode=%s",
		viper.GetString("db.host"),
		viper.GetString("db.user"),
		viper.GetString("db.password"),
		viper.GetString("db.database"),
		viper.GetInt("db.port"),
		viper.GetString("db.sslmode"),
	)
	log := zapgorm.New(logger)
	log.SetAsDefault()
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: log,
	})
	if err != nil {
		panic(err)
	}
	lc.Append(fx.Hook{
		OnStart: func(context.Context) error {
			logger.Info("Migrating models")
			db.AutoMigrate(&models.User{})
			db.AutoMigrate(&models.Todo{})
			return nil
		},
	})
	return db
}
