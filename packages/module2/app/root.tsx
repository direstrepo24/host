import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { ModuleRoot } from "./ModuleRoot";
import pkg from "../package.json";
import styles from "./tailwind.css";

export const meta: MetaFunction = () => {
  return [
    { title: "Module 2" },
    { name: "description", content: "Analytics and metrics visualization" },
  ];
};

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: styles },
];

export const loader: LoaderFunction = async () => {
  return json({
    version: pkg.version || "1.0.0",
    buildTime: process.env.BUILD_TIME || new Date().toISOString(),
  });
};

export default function App() {
  const { version, buildTime } = useLoaderData<typeof loader>();

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <ModuleRoot version={version} buildTime={buildTime} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
