import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: 'https://dnd-eight-self.vercel.app/',
  server: {
    port: 3090
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
