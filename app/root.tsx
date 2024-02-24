import { cssBundleHref } from "@remix-run/css-bundle"
import type { LinksFunction, MetaFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react"
import { getAllPokemons } from "./data"

export const meta: MetaFunction = () => {
  return [
    { title: "Pokemon App Remix" },
    { name: "Pokemon Database", content: "Welcome to the Pokedex" }
  ]
}

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : [])
]

export const loader = async () => {
  const pokemons = await getAllPokemons()
  return json({ pokemons })
}

export default function App() {
  const { pokemons } = useLoaderData<typeof loader>()

  console.log(pokemons)

  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
