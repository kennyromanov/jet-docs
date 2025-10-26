import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    eslint(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@public': resolve(__dirname, './public'),
      '@core/index.css': resolve(__dirname, '../core/dist/index.css'),
      '@core/fonts.css': resolve(__dirname, '../core/dist/fonts.css'),
      '@core': resolve(__dirname, '../core/dist/index.es.js'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
});
