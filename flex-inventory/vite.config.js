import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    // Përshtate me strukturën tënde:
    include: ['src/**/_test_/**/*.test.{js,jsx,ts,tsx}', 'src/**/__tests__/**/*.test.{js,jsx,ts,tsx}'],
  },
})
