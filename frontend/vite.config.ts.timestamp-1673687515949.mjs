// vite.config.ts
import { defineConfig } from "file:///C:/Users/morav/Documents/Projects/jolt/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/morav/Documents/Projects/jolt/frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
import codegen from "file:///C:/Users/morav/Documents/Projects/jolt/frontend/node_modules/vite-plugin-graphql-codegen/dist/index.js";
var vite_config_default = defineConfig({
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
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxtb3JhdlxcXFxEb2N1bWVudHNcXFxcUHJvamVjdHNcXFxcam9sdFxcXFxmcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcbW9yYXZcXFxcRG9jdW1lbnRzXFxcXFByb2plY3RzXFxcXGpvbHRcXFxcZnJvbnRlbmRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL21vcmF2L0RvY3VtZW50cy9Qcm9qZWN0cy9qb2x0L2Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgY29kZWdlbiBmcm9tIFwidml0ZS1wbHVnaW4tZ3JhcGhxbC1jb2RlZ2VuXCI7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KCksXHJcbiAgICBjb2RlZ2VuKHtcclxuICAgICAgY29uZmlnOiB7XHJcbiAgICAgICAgc2NoZW1hOiBcImh0dHA6Ly9sb2NhbGhvc3Q6NTAwMS9ncmFwaHFsXCIsXHJcbiAgICAgICAgZG9jdW1lbnRzOiBbXCJzcmMvKiovKi57dHMsdHN4fVwiXSxcclxuICAgICAgICBnZW5lcmF0ZXM6IHtcclxuICAgICAgICAgIFwiLi9zcmMvZ3FsL1wiOiB7XHJcbiAgICAgICAgICAgIHByZXNldDogXCJjbGllbnRcIixcclxuICAgICAgICAgICAgcGx1Z2luczogW10sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuICBdLFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2VSxTQUFTLG9CQUFvQjtBQUMxVyxPQUFPLFdBQVc7QUFDbEIsT0FBTyxhQUFhO0FBR3BCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxNQUNOLFFBQVE7QUFBQSxRQUNOLFFBQVE7QUFBQSxRQUNSLFdBQVcsQ0FBQyxtQkFBbUI7QUFBQSxRQUMvQixXQUFXO0FBQUEsVUFDVCxjQUFjO0FBQUEsWUFDWixRQUFRO0FBQUEsWUFDUixTQUFTLENBQUM7QUFBQSxVQUNaO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
