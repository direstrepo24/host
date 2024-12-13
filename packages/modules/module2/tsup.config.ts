import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['app/routes/_index.tsx'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    '@remix-run/node',
    '@remix-run/react',
    '@mk-modular/shared',
  ],
  tsconfig: 'tsconfig.build.json',
});
