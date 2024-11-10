import react from "@vitejs/plugin-react";
import { obfuscator } from "rollup-obfuscator";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), obfuscator()],
  css: {
    postcss: { plugins: [tailwindcss()] },
  },
});
