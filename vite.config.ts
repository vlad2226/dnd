import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/dnd-git-main-vlad2226s-projects',
  server: {
    port: 3090
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
