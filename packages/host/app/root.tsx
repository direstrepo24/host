import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
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
import { useEventPublisher } from "@mk-modular/shared/events";
import { useEffect } from "react";

import styles from "./tailwind.css";
import pkg from "../package.json";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: styles },
];

export async function loader() {
  // Simular verificación de autenticación
  const isAuthenticated = true; // En producción, esto vendría de una sesión real
  const userRole = "admin";

  if (!isAuthenticated) {
    return redirect("/login");
  }

  return json({
    user: {
      id: "1",
      role: userRole,
      permissions: ["read", "write"],
    },
    version: pkg.version || "1.0.0",
    buildTime: new Date().toISOString(),
  });
}

export default function App() {
  const { user, version, buildTime } = useLoaderData<typeof loader>();
  const eventPublisher = useEventPublisher();

  useEffect(() => {
    // Publicar el estado de autenticación para que los módulos lo reciban
    eventPublisher.publish("AUTH_STATE_CHANGE", {
      type: "AUTH_STATE_CHANGE",
      payload: {
        isAuthenticated: true,
        user: {
          id: user.id,
          role: user.role,
          permissions: user.permissions,
        },
      },
      timestamp: Date.now(),
      source: "host",
    });
  }, [user, eventPublisher]);

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
              <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    Modular Remix App
                  </h1>
                  <div className="text-sm text-gray-600">
                    Logged in as: {user.role}
                  </div>
                </div>
              </header>
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
