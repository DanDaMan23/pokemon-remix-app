import { useEffect } from "react"

interface PokemonCardProps {
  name: string
  url: string
}

export default function PokemonCard({ name, url }: PokemonCardProps) {
  useEffect(() => {
    // Create separate function for this
    const fetchData = async () => {
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error("Failed to fetch pokemon")
        }
        const result = await response.json()
        console.log(result)
      } catch (error) {
        console.log(error)
        throw error
      }
    }
    fetchData()
  }, [url])

  return (
    <div className='w-[250px] border rounded-lg p-3'>
      <p className='capitalize'>{name}</p>
      <p className='hidden'>{url}</p>
    </div>
  )
}
