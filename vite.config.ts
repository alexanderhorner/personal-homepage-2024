import mdx from '@mdx-js/rollup'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    tsconfigPaths(),
    imagetools({
      defaultDirectives: (url) => {
        if (url.searchParams.size === 0) {
          return new URLSearchParams({
            format: 'jpg',
            quality: '60',
            w: '2048',
            withoutEnlargement: 'true',
          })
        }

        return url.searchParams
      },
    }),
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    mdx(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
      },
    }),
    react(),
  ],
})
