package pkg

import (
	"github.com/spf13/viper"
	"go.uber.org/zap"
)

func NewLogger() (logger *zap.Logger) {
	if viper.GetString("environment") == "production" {
		logger, _ = zap.NewProduction()
	} else {
		logger, _ = zap.NewDevelopment()
	}

	logger.Info("Executing NewLogger.")

	return logger
}
