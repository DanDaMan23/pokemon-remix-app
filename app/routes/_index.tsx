import { useEffect, useState } from "react"
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

  type PokemonDataType = {
    name: string
    url: string
  }

  const [pokemonList, setPokemonList] = useState<Array<PokemonDataType>>([])

  const [pokemonNextLink, setPokemonNextLink] = useState<string>(
    pokemonData.next
  )

  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false)

  useEffect(() => {
    setPokemonList(pokemonData.pokemons)
    setPokemonNextLink(pokemonData.next)
  }, [pokemonData.next, pokemonData.pokemons])

  const addPokemonsToList = async () => {
    setIsButtonLoading(true)
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
    setIsButtonLoading(false)
  }

  return (
    <>
      <div className='flex gap-2 flex-wrap justify-around'>
        {pokemonList.length &&
          pokemonList.map((pokemon: PokemonDataType, index: number) => (
            <PokemonCard key={index} {...pokemon} />
          ))}
      </div>

      <div className='text-center m-3'>
        <button
          onClick={addPokemonsToList}
          className='border border-black p-1 rounded-lg w-full flex justify-center'
        >
          {isButtonLoading ? (
            <img
              src='/images/pokeball-spinner.png'
              alt='pokeball'
              className='animate-spin h-5 w-5 mr-3'
            />
          ) : (
            "More..."
          )}
        </button>
      </div>
    </>
  )
}
