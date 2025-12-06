import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/primo-model-showcase-47310e26/' : '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Keep original names for images to improve caching
          if (assetInfo.name && /\.(jpe?g|png|gif|svg|webp)$/i.test(assetInfo.name)) {
            return 'assets/[name][extname]';
          }
          // Use hash for other assets (CSS, JS, etc.)
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
}));
