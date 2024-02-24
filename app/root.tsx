import type { LinksFunction, MetaFunction } from "@remix-run/node"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react"

import styles from "./tailwind.css"

export const meta: MetaFunction = () => {
  return [
    { title: "Pokemon App Remix" },
    { name: "Pokemon Database", content: "Welcome to the Pokedex" }
  ]
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }]

export default function App() {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body className='m-3'>
        <p className='text-2xl font-extrabold'>Pokedex</p>
        <div className='m-5'>
          <Outlet />
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
