import type { LoaderFunctionArgs } from "@remix-run/node"

import { json } from "@remix-run/node"

import { useLoaderData } from "@remix-run/react"

import invariant from "tiny-invariant"
import { getPokemon } from "~/data"
import { pokemonBackgroundColorTypes } from "~/utils"
import PokemonTypePill from "./components/pokemon_type_pill"

export async function loader({ params: { pokemonId } }: LoaderFunctionArgs) {
  invariant(pokemonId, "Missing PokemonId or Name")
  const pokemon = await getPokemon(pokemonId)
  if (!pokemon) {
    throw new Response("Not Found", { status: 404 })
  }
  return json({ pokemon })
}

export default function Pokemon() {
  const { pokemon } = useLoaderData<typeof loader>()
  const background = pokemonBackgroundColorTypes[pokemon.types[0].type.name]

  type PokemonType = {
    id: number
    sprites: { front_default: string }
    types: [{ type: { name: string } }]
  }

  console.log(pokemon.types[0].type.name)

  return (
    <div className={`${background} p-5`}>
      <div className='text-white flex justify-evenly items-center'>
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.id}
          className='w-48'
        />
        <div className='flex flex-col gap-3'>
          <p className='text-l'># {pokemon.id}</p>
          <p className='text-2xl capitalize font-bold'>{pokemon.name}</p>
          <div className='flex gap-3'>
            {(pokemon as PokemonType).types.map(({ type: { name } }, index) => (
              <PokemonTypePill key={index} name={name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
