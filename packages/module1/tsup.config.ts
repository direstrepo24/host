import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["app/routes/_index.tsx"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  external: ["react", "react-dom", "@remix-run/react", "@mk-modular/shared", "lucide-react"],
  sourcemap: true,
  tsconfig: "tsconfig.build.json",
});
