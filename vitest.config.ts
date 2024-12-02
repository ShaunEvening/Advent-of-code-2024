import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: [
        'src/**/*.test.ts',
        'src/**/fixtures/**',
        'src/**/input.ts',
        'src/**/index.ts',
      ],
    },
  },
});
