import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      external: ['geostyler-lyrx-parser']
    },
    lib: {
      name: 'geostyler-lyrx-parser',
      fileName: 'main',
      entry: resolve(__dirname, 'src/LyrxParser.ts'),
      formats: ['es', 'umd'],
    }
  }
});
