import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/dnd',
  server: {
    port: 3090
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
