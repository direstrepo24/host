/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  server: "./server.ts",
  serverBuildPath: "build/index.js",
  serverConditions: ["workerd", "worker", "browser"],
  serverDependenciesToBundle: [
    /@mk-modular\/.*/,
    /^@radix-ui\/.*/,
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
    "cookie-signature",
    "stream-slice",
    "crypto",
    "stream"
  ],
  serverMainFields: ["browser", "module", "main"],
  serverMinify: true,
  serverModuleFormat: "esm",
  serverPlatform: "neutral",
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  future: {
    v3_fetcherPersist: true,
    v3_relativeSplatPath: true,
    v3_throwAbortReason: true,
  }
};
