import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import codegen from "vite-plugin-graphql-codegen";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    codegen({
      config: {
        schema:
          mode === "development"
            ? "http://localhost:5001/graphql"
            : "schema/*.graphqls",
        documents: ["src/**/*.{ts,tsx}"],
        generates: {
          "./src/gql/": {
            preset: "client",
            plugins: [],
          },
        },
      },
    }),
  ],
}));
