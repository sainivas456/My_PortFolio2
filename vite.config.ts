import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig(({ }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['@emailjs/browser'], // ✅ Ensures it's pre-bundled during dev
  },
  build: {
    rollupOptions: {
      external: ['@emailjs/browser'], // ✅ Externalizes it to avoid build issues
    },
  },
}));
