// vite.config.ts
import { defineConfig } from "file:///C:/Users/morav/Documents/Projects/jolt/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/morav/Documents/Projects/jolt/frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
import codegen from "file:///C:/Users/morav/Documents/Projects/jolt/frontend/node_modules/vite-plugin-graphql-codegen/dist/index.js";
var vite_config_default = defineConfig(() => ({
  plugins: [
    react(),
    codegen({
      config: {
        schema: process.env.DOCKER_BUILD === "true" ? "schema/*.graphqls" : process.env.CI === "true" ? "../server/graph/*.graphqls" : "http://localhost:5001/graphql",
        documents: ["src/**/*.{ts,tsx}"],
        generates: {
          "./src/gql/": {
            preset: "client",
            plugins: []
          }
        }
      }
    })
  ]
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxtb3JhdlxcXFxEb2N1bWVudHNcXFxcUHJvamVjdHNcXFxcam9sdFxcXFxmcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcbW9yYXZcXFxcRG9jdW1lbnRzXFxcXFByb2plY3RzXFxcXGpvbHRcXFxcZnJvbnRlbmRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL21vcmF2L0RvY3VtZW50cy9Qcm9qZWN0cy9qb2x0L2Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgY29kZWdlbiBmcm9tIFwidml0ZS1wbHVnaW4tZ3JhcGhxbC1jb2RlZ2VuXCI7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKCkgPT4gKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICByZWFjdCgpLFxyXG4gICAgY29kZWdlbih7XHJcbiAgICAgIGNvbmZpZzoge1xyXG4gICAgICAgIHNjaGVtYTpcclxuICAgICAgICAgIHByb2Nlc3MuZW52LkRPQ0tFUl9CVUlMRCA9PT0gXCJ0cnVlXCJcclxuICAgICAgICAgICAgPyBcInNjaGVtYS8qLmdyYXBocWxzXCJcclxuICAgICAgICAgICAgOiBwcm9jZXNzLmVudi5DSSA9PT0gXCJ0cnVlXCJcclxuICAgICAgICAgICAgPyBcIi4uL3NlcnZlci9ncmFwaC8qLmdyYXBocWxzXCJcclxuICAgICAgICAgICAgOiBcImh0dHA6Ly9sb2NhbGhvc3Q6NTAwMS9ncmFwaHFsXCIsXHJcbiAgICAgICAgZG9jdW1lbnRzOiBbXCJzcmMvKiovKi57dHMsdHN4fVwiXSxcclxuICAgICAgICBnZW5lcmF0ZXM6IHtcclxuICAgICAgICAgIFwiLi9zcmMvZ3FsL1wiOiB7XHJcbiAgICAgICAgICAgIHByZXNldDogXCJjbGllbnRcIixcclxuICAgICAgICAgICAgcGx1Z2luczogW10sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuICBdLFxyXG59KSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlUsU0FBUyxvQkFBb0I7QUFDMVcsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sYUFBYTtBQUdwQixJQUFPLHNCQUFRLGFBQWEsT0FBTztBQUFBLEVBQ2pDLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxNQUNOLFFBQVE7QUFBQSxRQUNOLFFBQ0UsUUFBUSxJQUFJLGlCQUFpQixTQUN6QixzQkFDQSxRQUFRLElBQUksT0FBTyxTQUNuQiwrQkFDQTtBQUFBLFFBQ04sV0FBVyxDQUFDLG1CQUFtQjtBQUFBLFFBQy9CLFdBQVc7QUFBQSxVQUNULGNBQWM7QUFBQSxZQUNaLFFBQVE7QUFBQSxZQUNSLFNBQVMsQ0FBQztBQUFBLFVBQ1o7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFDRixFQUFFOyIsCiAgIm5hbWVzIjogW10KfQo=
