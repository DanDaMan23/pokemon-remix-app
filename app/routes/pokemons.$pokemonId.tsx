import type { LoaderFunctionArgs } from "@remix-run/node"

import { json } from "@remix-run/node"

import { useLoaderData } from "@remix-run/react"

import invariant from "tiny-invariant"
import { getPokemon } from "~/data"
import { pokemonBackgroundColorTypes } from "~/utils"
import PokemonTypePill from "./components/pokemon_type_pill"
import { Tab } from "@headlessui/react"
import { useState } from "react"

export async function loader({ params: { pokemonId } }: LoaderFunctionArgs) {
  invariant(pokemonId, "Missing PokemonId or Name")
  const pokemon = await getPokemon(pokemonId)
  if (!pokemon) {
    throw new Response("Not Found", { status: 404 })
  }
  return json({ pokemon })
}

export default function Pokemon() {
  const { pokemon } = useLoaderData<typeof loader>()
  const background = pokemonBackgroundColorTypes[pokemon.types[0].type.name]

  type PokemonType = {
    id: number
    sprites: { front_default: string }
    types: [{ type: { name: string } }]
    height: number
    weight: number
    abilities: [{ ability: { name: string } }]
  }

  const MainInfo = () => (
    <div
      className={`text-white flex justify-evenly items-center p-5 ${background}`}
    >
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.id}
        className='w-48'
      />
      <div className='flex flex-col gap-3'>
        <p className='text-l'># {pokemon.id}</p>
        <p className='text-2xl capitalize font-bold'>{pokemon.name}</p>
        <div className='flex gap-3'>
          {(pokemon as PokemonType).types.map(({ type: { name } }, index) => (
            <PokemonTypePill key={index} name={name} />
          ))}
        </div>
      </div>
    </div>
  )

  const AboutDetails = () => (
    <div className='bg-white flex flex-col gap-5'>
      <p>Height: {pokemon.height * 10}cm</p>
      <p>Weight: {pokemon.weight / 10}kg</p>
      <div className='flex gap-1'>
        <p>Abilities: </p>
        {pokemon.abilities.map(
          (
            { ability: { name } }: { ability: { name: string } },
            index: number
          ) => (
            <div key={index} className='flex'>
              <p>
                {name}
                {index !== pokemon.abilities.length - 1 && ","}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  )

  const [selectedTab, setSelectedTab] = useState<number>(0)
  const tabs = [
    { title: "About", content: <AboutDetails /> },
    { title: "Stats", content: <>Stats</> },
    { title: "Evolution", content: <>Evolution</> }
  ]

  return (
    <div className='w-full'>
      <MainInfo />
      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List
          className={`flex space-x-1 p-1 my-1 rounded-xl ${background}`}
        >
          {tabs.map(({ title }, index) => (
            <Tab key={index} className='rounded-xl bg-white p-1 w-full'>
              {title}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {tabs.map(({ content }, index) => (
            <Tab.Panel key={index}>{content}</Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
