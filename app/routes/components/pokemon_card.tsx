interface PokemonCardProps {
  name: string
  url: string
}

export default function pokemonCard({ name, url }: PokemonCardProps) {
  return (
    <div className='w-[250px] border rounded-lg p-3'>
      <p className='capitalize'>{name}</p>
      <p className='hidden'>{url}</p>
    </div>
  )
}
