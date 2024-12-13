import { Outlet } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import pkg from "../../package.json";

export const loader: LoaderFunction = async () => {
  return json({
    version: pkg.version || "1.0.0",
    buildTime: process.env.BUILD_TIME || new Date().toISOString(),
  });
};

export default function Layout() {
  return (
    <div className="min-h-screen bg-base">
      <Outlet />
    </div>
  );
}
