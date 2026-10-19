import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import fs from 'node:fs';

const sharedDir = fs.existsSync(path.resolve(__dirname, '../shared'))
  ? path.resolve(__dirname, '../shared')
  : path.resolve(__dirname, 'src/data');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@shared': sharedDir,
    },
  },
  server: {
    port: 5173,
    fs: { allow: ['..'] },
    proxy: { '/api': 'http://localhost:5000' },
  },
});
