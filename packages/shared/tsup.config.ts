import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/events/index.ts',
    'src/routing/index.ts'
  ],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  splitting: false,
  external: ['react', 'react-dom'],
  treeshake: true,
  sourcemap: true,
  jsx: true
});
