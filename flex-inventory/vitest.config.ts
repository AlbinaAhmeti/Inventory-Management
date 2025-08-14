import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    include: ['src/**/__tests__/**/*.test.{js,jsx,ts,tsx}'],
    restoreMocks: true,
    clearMocks: true,
  },
})
