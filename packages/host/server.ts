import { createEventHandler } from "@remix-run/cloudflare-workers";
import * as build from "@remix-run/dev/server-build";

const handleRequest = createEventHandler({ build, mode: process.env.NODE_ENV });

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    try {
      return await handleRequest(request, env, ctx);
    } catch (error) {
      console.error("Error handling request:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};
