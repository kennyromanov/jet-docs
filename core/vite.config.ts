import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [ vue(), tailwindcss(), eslint() ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'jet-docs',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [ 'vue', 'jet-edit' ],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
