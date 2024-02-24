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
