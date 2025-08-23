import { defineConfig } from 'vite'
import minifier from 'html-minifier-terser'
const { minify } = minifier

export default defineConfig({
  base: './',
  server: {
    port: 3333,
    host: '0.0.0.0',
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        toplevel: true,
        unused: true,
        drop_console: true,
        drop_debugger: true,
        dead_code: true,
        inline: 2,
        sequences: true,
        booleans: true,
        conditionals: true,
        loops: true,
        properties: true,
        comparisons: true,
        join_vars: true,
        collapse_vars: true,
        reduce_vars: true,
        module: true,
        arguments: true,
        hoist_vars: true,
        pure_getters: true,
        pure_funcs: ['console.log'],
        passes: 3,
      },
      mangle: {
        properties: {
          regex: /^_/,
        },
      },
    },
    assetsInlineLimit: 0,
    cssCodeSplit: false,
    sourcemap: false,
    rollupOptions: {
      output: {
        compact: true,
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
      },
    },
  },
  plugins: [
    {
      name: 'html-minify',
      enforce: 'post',
      apply: 'build',
      transformIndexHtml(html) {
        return minify(html, {
          collapseWhitespace: true,
          removeComments: true,
          minifyCSS: true,
          minifyJS: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
        })
      },
    },
  ],
})
