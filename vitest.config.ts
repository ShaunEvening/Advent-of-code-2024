import { defineConfig } from 'vitest/config';
import tsPathsPlugin from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsPathsPlugin()],
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
