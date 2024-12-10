import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { MainLayout } from "./components/layout/main-layout";
import { EventProvider } from "@mk-modular/shared/events";
import { DynamicRouter } from "./components/DynamicRouter";

import styles from "./tailwind.css";
import pkg from "../package.json";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: styles },
];

export const loader: LoaderFunction = async () => {
  return json({
    version: pkg.version || "1.0.0",
    buildTime: new Date().toISOString(),
  });
};

export default function App() {
  const { version, buildTime } = useLoaderData<typeof loader>();

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col">
        <EventProvider>
          <div id="app" className="flex-1">
            <MainLayout version={version} buildTime={buildTime}>
              <DynamicRouter />
            </MainLayout>
          </div>
        </EventProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
