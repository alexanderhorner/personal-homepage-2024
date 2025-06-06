import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import mdx from '@mdx-js/rollup'
import { imagetools } from 'vite-imagetools'
import path from "path";

export default defineConfig({
  plugins: [
    mdx(),
    imagetools({
      defaultDirectives: (url) => {
        const amountOfParameters = url.searchParams.size

        // If no parameters are provided, we will return the default parameters
        if (amountOfParameters === 0) {
          // jpg, max width 2048px
          return new URLSearchParams({
            format: 'jpg',
            quality: '60',
            w: '2048',
            withoutEnlargement: 'true',
          })
        }

        // return the original parameters
        return url.searchParams
      },
    }),
    reactRouter(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "/app"),
    },
  },
});
