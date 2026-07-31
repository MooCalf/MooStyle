// defineConfig from vitest/config re-exports Vite's defineConfig with the
// `test` block typed, so Vitest can share this one config (plugins, alias)
// instead of duplicating it in a separate vitest.config.js.
import { defineConfig } from 'vitest/config'
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
  test: {
    // Pure logic tests only (date math, allowlist checks) — no DOM needed.
    environment: "node",
  },
});
