export async function getAllPokemons() {
  const API_URL = "https://pokeapi.co/api/v2/pokemon/"

  try {
    const response = await fetch(API_URL)

    if (!response) {
      throw new Error("Failed to fetch pokemons")
    }

    const data = await response.json()

    return { pokemons: data.results, next: data.next }
  } catch (error) {
    console.error("Fetching pokemon error", error)
    throw error
  }
}

export async function getPokemon(pokemonId: string) {
  const API_URL = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`

  try {
    const response = await fetch(API_URL)

    if (!response) {
      throw new Error(`Failed to fetch pokemon ${pokemonId}`)
    }

    const data = await response.json()

    return data
  } catch (error) {
    console.error(`Fetching ${pokemonId} failed`, error)
    throw error
  }
}
