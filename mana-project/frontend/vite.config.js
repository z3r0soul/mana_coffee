

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5174,
    allowedHosts: [
      "subtemporal-conception-brusquely.ngrok-free.dev" //cambiar a subtemporal-conception-brusquely.ngrok-free.dev
    ],
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
      },
    }
  }
});
