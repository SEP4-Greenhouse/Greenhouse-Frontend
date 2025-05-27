import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import * as path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/Greenhouse-Frontend/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  test: {
    environment: 'jsdom', // ✅ This is the fix
     globals: true, // ✅ THIS LINE FIXES THE 'expect is not defined' ERROR
  },
  
});
