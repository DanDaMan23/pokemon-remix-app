import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import PokemonCard from "./components/pokemon_card"

import { getAllPokemons } from "~/data"

export const loader = async () => {
  const pokemonData = await getAllPokemons()
  return json({ pokemonData })
}

export default function Index() {
  const { pokemonData } = useLoaderData<typeof loader>()

  console.log(pokemonData)

  return (
    <div className='flex gap-2 flex-wrap justify-between'>
      {pokemonData.pokemons.length &&
        pokemonData.pokemons.map(
          (pokemon: { name: string; url: string }, index: number) => (
            <PokemonCard key={index} {...pokemon} />
          )
        )}
    </div>
  )
}
