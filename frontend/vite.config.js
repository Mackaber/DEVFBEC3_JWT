import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../docs",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "index.html",
      },
    },
    // Use relative assets directory for static files
    // So it appears as "assets/" (without leading slash) in the generated HTML
    assetsDir: "./assets",
  },
});
