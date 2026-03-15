import "./app.css";
import { Outlet, Scripts, ScrollRestoration } from "react-router";

export function links() {
  return [{ rel: "stylesheet", href: "./app.css" }];
}

export default function App() {
  return (
    <html lang="vi">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="./app.css" />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
