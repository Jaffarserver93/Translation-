import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// #update this line 👇
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['openai'], // Explicitly externalize openai to avoid bundling issues
    },
  },
});
