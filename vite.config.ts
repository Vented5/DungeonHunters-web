import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'My PWA',
        short_name: 'PWA',
        description: 'A Progressive Web App for my project',
        start_url: '/',
        display: 'standalone',
        background_color: '#242424',
        theme_color: '#646cff',
        icons: [
          {
            src: 'DungeonHunters-web/src/assets/dungeongame192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'DungeonHunters-web/src/assets/dungeongame512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.example\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24, // 1 day
              },
            },
          },
        ],
      },
    }),
  ],
});