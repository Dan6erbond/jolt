import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import codegen from "vite-plugin-graphql-codegen";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    codegen({
      config: {
        schema: "http://localhost:5001/graphql",
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
});
