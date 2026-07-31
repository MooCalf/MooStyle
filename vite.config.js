import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname,"./src"),
    }
  },
  ssr: {
    // react-helmet-async ships CJS; bundle it so Node's ESM loader doesn't
    // choke trying to statically detect its named exports.
    noExternal: ["react-helmet-async"],
  },
});
