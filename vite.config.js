import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Nara Paéz Aguirre',
        short_name: 'Nara Paéz Aguirre',
        description: 'Nara Paéz Aguirre Album',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/icons/icon-192x192-2.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512x512-2.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
