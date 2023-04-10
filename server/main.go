/*
Copyright © 2023 NAME HERE <EMAIL ADDRESS>

*/
package main

import (
	"fmt"

	"github.com/dan6erbond/jolt-server/cmd"
	"github.com/spf13/viper"
)

func init() {
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
	viper.AddConfigPath(".")

	//nolint:gomnd // default values not used anywhere else
	viper.SetDefault("server.port", 5001)
	viper.SetDefault("server.host", "0.0.0.0")

	//nolint:gomnd // default value for Postgres port
	viper.SetDefault("db.port", 5432)
	viper.SetDefault("db.sslmode", "disable")

	viper.AutomaticEnv()

	if err := viper.BindEnv("db.host", "DB_HOST", "POSTGRES_HOST"); err != nil {
		fmt.Println(err.Error())
	}

	if err := viper.BindEnv("db.port", "DB_PORT", "POSTGRES_PORT"); err != nil {
		fmt.Println(err.Error())
	}

	if err := viper.BindEnv("db.user", "DB_USER", "POSTGRES_USER"); err != nil {
		fmt.Println(err.Error())
	}

	if err := viper.BindEnv("db.password", "DB_PASSWORD", "POSTGRES_PASSWORD"); err != nil {
		fmt.Println(err.Error())
	}

	if err := viper.BindEnv("db.database", "DB_DATABASE", "POSTGRES_DATABASE", "POSTGRES_DB"); err != nil {
		fmt.Println(err.Error())
	}

	viper.SetDefault("server.enablefrontend", true)

	if err := viper.BindEnv("server.enablefrontend", "JOLT_ENABLE_FRONTEND"); err != nil {
		fmt.Println(err.Error())
	}

	if err := viper.BindEnv("server.frontendpath", "JOLT_FRONTEND", "JOLT_FRONTEND_PATH"); err != nil {
		fmt.Println(err.Error())
	}

	if err := viper.BindEnv("environment", "GO_ENV"); err != nil {
		fmt.Println(err.Error())
	}

	viper.SetDefault("tmdb.country", "US")
	viper.SetDefault("tmdb.fallbackcountry", "US")

	err := viper.ReadInConfig()
	if err != nil {
		panic(fmt.Errorf("fatal error config file: %w", err))
	}
}

func main() {
	cmd.Execute()
}
