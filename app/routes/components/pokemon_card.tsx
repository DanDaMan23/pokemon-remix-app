import { useEffect, useState } from "react"
import { pokemonBackgroundColorTypes } from "~/utils"

interface PokemonCardProps {
  name: string
  url: string
}

export default function PokemonCard({ name, url }: PokemonCardProps) {
  type PokemonDataType = {
    id: number
    sprites: { front_default: string }
    types: [{ type: { name: string } }]
  }
  const [pokemonData, setPokemonData] = useState<PokemonDataType>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error("Failed to fetch pokemon")
        }
        const result = await response.json()
        setPokemonData(result)
      } catch (error) {
        console.log(error)
        throw error
      }
    }
    fetchData()
  }, [url])

  return (
    <>
      {pokemonData && (
        <div
          className={`w-[250px] border-none rounded-lg p-3 flex flex-col gap-4 ${
            pokemonBackgroundColorTypes[pokemonData.types[0].type.name]
          }`}
        >
          {/* Picture */}
          <div className='flex justify-center'>
            <img
              src={pokemonData.sprites.front_default}
              alt={name}
              className='w-52'
            />
          </div>

          <p className='capitalize text-white text-2xl font-bold'>{name}</p>
          {/* Number */}
          <p className='text-white text-l'># {pokemonData.id}</p>
          <p className='hidden'>{url}</p>
          {/* Types */}
          <div className='flex gap-3 text-white'>
            {pokemonData.types.map(({ type: { name } }, index) => (
              <p
                className={`${pokemonBackgroundColorTypes[name]} border border-black min-w-20 rounded-full p-2 text-center capitalize`}
                key={index}
              >
                {name}
              </p>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
