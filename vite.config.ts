import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import customHeaderPlugin from "./vite-plugin-custom-header.ts";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    headers: {
      // Add Content-Security-Policy header to allow necessary script execution
      "Content-Security-Policy": [
        "default-src 'self';",
        "img-src 'self' data: blob: https://placehold.co;",
        "style-src 'self' 'unsafe-inline';", 
        "script-src 'self' 'unsafe-eval' 'unsafe-inline';", // Allow unsafe-eval for development
        "connect-src 'self' https://api.venice.ai;",
        "font-src 'self' data:;",
        "frame-src 'self';",
        "object-src 'none';"
      ].join(" ")
    }
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    customHeaderPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
