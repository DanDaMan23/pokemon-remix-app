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
        console.log(result)
        setPokemonData(result)
      } catch (error) {
        console.log(error)
        throw error
      }
    }
    fetchData()
  }, [url])

  return (
    <div className='w-[250px] border rounded-lg p-3'>
      {pokemonData && (
        <>
          {/* Picture */}
          <img src={pokemonData.sprites.front_default} alt={name} />
          <p className='capitalize'>{name}</p>
          {/* Number */}
          <p>{pokemonData.id}</p>
          <p className='hidden'>{url}</p>
          {/* Types */}
          {pokemonData.types.map(({ type: { name } }, index) => (
            <p className={`${pokemonBackgroundColorTypes[name]}`} key={index}>
              {name}
            </p>
          ))}
        </>
      )}
    </div>
  )
}
