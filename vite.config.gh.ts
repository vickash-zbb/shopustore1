// vite.config.gh.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  base: "/shopustore1/", // Match your GitHub repo name
  build: {
    outDir: "dist", // Must be 'dist' for GitHub Pages
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
});
