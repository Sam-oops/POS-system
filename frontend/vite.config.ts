import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// In Docker the proxy points at the backend container; locally it falls back
// to localhost. The browser only ever talks to the Vite server at /api.
const proxyTarget = process.env.VITE_PROXY_TARGET ?? 'http://localhost:4000';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': proxyTarget,
    },
  },
});
