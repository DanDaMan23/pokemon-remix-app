import { pokemonBackgroundColorTypes } from "~/utils"

interface PokemonTypePillProps {
  name: string
}

export default function PokemonTypePill({ name }: PokemonTypePillProps) {
  return (
    <p
      className={`${pokemonBackgroundColorTypes[name]} border border-black min-w-20 rounded-full p-2 text-center capitalize`}
    >
      {name}
    </p>
  )
}
