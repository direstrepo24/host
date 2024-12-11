import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/events/index.ts',
    'src/routing/index.ts',
    'src/components/Breadcrumbs.tsx',
    'src/hooks/moduleLifecycle.ts',
    'src/middleware/auth.ts'
  ],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  splitting: false,
  external: ['react', 'react-dom', '@remix-run/node', '@remix-run/react'],
  treeshake: true,
  sourcemap: true,
  jsx: true
});
