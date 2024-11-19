import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: "jsx", // Permet à tous les fichiers JS contenant du JSX d'être traités correctement
  },
});
