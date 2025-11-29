import { defineConfig } from 'vite';

export default defineConfig({
  // Base path for GitHub Pages deployment
  // Change this if deploying to a different path
  base: '/CSU_Virtual_Tour/',
  
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html'
      }
    }
  },
  
  // Copy public assets (audios, images) to dist
  publicDir: 'public',
  
  // Define environment variables to be replaced at build time
  define: {
    '__GOOGLE_MAPS_API_KEY__': JSON.stringify(process.env.VITE_GOOGLE_MAPS_API_KEY || '')
  }
});
