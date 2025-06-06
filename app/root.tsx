import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import "./global.css";
import "@fontsource-variable/inter";
import '@fontsource-variable/inter-tight';

import { ScrollLockContext } from "./scrollLockContext";
import { useState } from "react";

// Font awsome css import
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export function Layout({ children }: { children: React.ReactNode }) {
  const [scrollLock, setScrollLock] = useState(false);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className={`font-sans text-gray-900 ${scrollLock ? 'overflow-hidden' : ''}`}>
        <ScrollLockContext.Provider value={{ scrollLock, setScrollLock }}>
          {children}
        </ScrollLockContext.Provider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
