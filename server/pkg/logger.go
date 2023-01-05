package pkg

import (
	"go.uber.org/zap"
)

func NewLogger() *zap.Logger {
	logger, _ := zap.NewProduction()
	logger.Info("Executing NewLogger.")
	return logger
}
