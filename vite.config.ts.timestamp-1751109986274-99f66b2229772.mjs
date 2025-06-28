// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "/home/project";
var vite_config_default = defineConfig(({ mode }) => {
  const isExtension = mode === "extension";
  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ["lucide-react"]
    },
    build: {
      outDir: isExtension ? "dist-extension" : "dist",
      emptyOutDir: true,
      rollupOptions: isExtension ? {
        input: {
          background: resolve(__vite_injected_original_dirname, "public/background.js"),
          content: resolve(__vite_injected_original_dirname, "public/content.js"),
          popup: resolve(__vite_injected_original_dirname, "public/popup.html")
        },
        output: {
          entryFileNames: "[name].js",
          chunkFileNames: "[name].js",
          assetFileNames: "[name].[ext]"
        }
      } : void 0
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIGNvbnN0IGlzRXh0ZW5zaW9uID0gbW9kZSA9PT0gJ2V4dGVuc2lvbic7XG4gIFxuICByZXR1cm4ge1xuICAgIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgICBvcHRpbWl6ZURlcHM6IHtcbiAgICAgIGV4Y2x1ZGU6IFsnbHVjaWRlLXJlYWN0J10sXG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgb3V0RGlyOiBpc0V4dGVuc2lvbiA/ICdkaXN0LWV4dGVuc2lvbicgOiAnZGlzdCcsXG4gICAgICBlbXB0eU91dERpcjogdHJ1ZSxcbiAgICAgIHJvbGx1cE9wdGlvbnM6IGlzRXh0ZW5zaW9uID8ge1xuICAgICAgICBpbnB1dDoge1xuICAgICAgICAgIGJhY2tncm91bmQ6IHJlc29sdmUoX19kaXJuYW1lLCAncHVibGljL2JhY2tncm91bmQuanMnKSxcbiAgICAgICAgICBjb250ZW50OiByZXNvbHZlKF9fZGlybmFtZSwgJ3B1YmxpYy9jb250ZW50LmpzJyksXG4gICAgICAgICAgcG9wdXA6IHJlc29sdmUoX19kaXJuYW1lLCAncHVibGljL3BvcHVwLmh0bWwnKSxcbiAgICAgICAgfSxcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdbbmFtZV0uanMnLFxuICAgICAgICAgIGNodW5rRmlsZU5hbWVzOiAnW25hbWVdLmpzJyxcbiAgICAgICAgICBhc3NldEZpbGVOYW1lczogJ1tuYW1lXS5bZXh0XSdcbiAgICAgICAgfVxuICAgICAgfSA6IHVuZGVmaW5lZFxuICAgIH1cbiAgfTtcbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7QUFBeU4sU0FBUyxvQkFBb0I7QUFDdFAsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZUFBZTtBQUZ4QixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUN4QyxRQUFNLGNBQWMsU0FBUztBQUU3QixTQUFPO0FBQUEsSUFDTCxTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsSUFDakIsY0FBYztBQUFBLE1BQ1osU0FBUyxDQUFDLGNBQWM7QUFBQSxJQUMxQjtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0wsUUFBUSxjQUFjLG1CQUFtQjtBQUFBLE1BQ3pDLGFBQWE7QUFBQSxNQUNiLGVBQWUsY0FBYztBQUFBLFFBQzNCLE9BQU87QUFBQSxVQUNMLFlBQVksUUFBUSxrQ0FBVyxzQkFBc0I7QUFBQSxVQUNyRCxTQUFTLFFBQVEsa0NBQVcsbUJBQW1CO0FBQUEsVUFDL0MsT0FBTyxRQUFRLGtDQUFXLG1CQUFtQjtBQUFBLFFBQy9DO0FBQUEsUUFDQSxRQUFRO0FBQUEsVUFDTixnQkFBZ0I7QUFBQSxVQUNoQixnQkFBZ0I7QUFBQSxVQUNoQixnQkFBZ0I7QUFBQSxRQUNsQjtBQUFBLE1BQ0YsSUFBSTtBQUFBLElBQ047QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
