import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    ssr: 'src/server.tsx',  // Server entry point
    outDir: 'dist',
    rollupOptions: {
      input: 'src/client.tsx',  // Client entry point
      output: {
        entryFileNames: 'server.js',
        format: 'cjs',
      },
    },
  },
  server: {
    port: 3000,
  },
});
