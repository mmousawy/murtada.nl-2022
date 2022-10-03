import type { HeadersFunction, LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import globalStyles from "./styles/index.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Murtada al Mousawy",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: globalStyles }];
};

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": "s-maxage=360, stale-while-revalidate=3600",
  };
};

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
        <link rel="preload" href="/fonts/Figtree-Variable.ttf" as="font" type="font/truetype" />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
