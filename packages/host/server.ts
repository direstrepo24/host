import "./app/utils/node-polyfills";
import { logDevReady } from "@remix-run/cloudflare";
import { createRequestHandler } from "@remix-run/cloudflare";
import * as build from "@remix-run/dev/server-build";
import { getAssetFromKV } from "@cloudflare/kv-asset-handler";
import manifestJSON from "__STATIC_CONTENT_MANIFEST";

if (process.env.NODE_ENV === "development") {
  logDevReady(build);
}

const handleRequest = createRequestHandler(build);
const assetManifest = JSON.parse(manifestJSON);

export default {
  async fetch(request: Request, env: any, ctx: ExecutionContext) {
    try {
      const url = new URL(request.url);
      if (url.pathname.startsWith("/build/")) {
        try {
          return await getAssetFromKV(
            {
              request,
              waitUntil: ctx.waitUntil.bind(ctx),
            },
            {
              ASSET_NAMESPACE: env.__STATIC_CONTENT,
              ASSET_MANIFEST: assetManifest,
              cacheControl: {
                browserTTL: 60 * 60 * 24 * 365, // 1 year
                edgeTTL: 60 * 60 * 24 * 365, // 1 year
              },
            }
          );
        } catch (error) {
          console.error("Error serving static asset:", error);
        }
      }

      const loadContext = {
        env,
        ctx,
      };
      
      return await handleRequest(request, loadContext);
    } catch (error) {
      console.error("Error handling request:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};
