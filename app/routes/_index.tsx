import { useEffect, useState } from "react"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import PokemonCard from "./components/pokemon_card"

import { getAllPokemons } from "~/data"

export const loader = async () => {
  const pokemonData = await getAllPokemons()
  console.log(pokemonData)
  return json({ pokemonData })
}

export default function Index() {
  const { pokemonData } = useLoaderData<typeof loader>()

  const [pokemonList, setPokemonList] = useState<
    Array<{
      name: string
      url: string
    }>
  >([])

  const [pokemonNextLink, setPokemonNextLink] = useState<string>(
    pokemonData.next
  )

  useEffect(() => {
    setPokemonList(pokemonData.pokemons)
    setPokemonNextLink(pokemonData.next)
  }, [pokemonData.next, pokemonData.pokemons])

  const addPokemonsToList = async () => {
    try {
      const response = await fetch(pokemonNextLink)
      if (!response.ok) {
        throw new Error("Failed to fetch next set of pokemon")
      }
      const data = await response.json()

      setPokemonList((prevState) => [...prevState, ...data.results])
      setPokemonNextLink(data.next)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  return (
    <>
      <div className='flex gap-2 flex-wrap justify-around'>
        {pokemonList.length &&
          pokemonList.map(
            (pokemon: { name: string; url: string }, index: number) => (
              <PokemonCard key={index} {...pokemon} />
            )
          )}
      </div>
      <button onClick={addPokemonsToList}>Add More</button>
    </>
  )
}
