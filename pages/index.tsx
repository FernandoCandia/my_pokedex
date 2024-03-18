import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Pokemon } from '../types';
import PokemonCard from '../components/PokemonCard';


const Home: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  const fetchPokemons = async (offset: number) => {
    const { data } = await axios.get<{ results: Pokemon[] }>(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=12`
    );
    const pokemons = await Promise.all(
      data.results.map(async (pokemon) => {
        const { data: pokemonData } = await axios.get<{
          id: number;
          sprites: { front_default: string };
          types: { type: { name: string } }[];
          abilities: { ability: { name: string }}
        }>(pokemon.url);
        return {
          name: pokemon.name,
          id: pokemonData.id,
          url: pokemon.url,
          sprites: pokemonData.sprites,
          types: pokemonData.types,
          abilities: pokemonData.abilities,
        };
      })
    );
    return pokemons;
  };

  const { data, isLoading, isError } = useQuery(['pokemons', offset], () => fetchPokemons(offset), {
    refetchOnWindowFocus: false,
    onSuccess: (data: Pokemon[]) => {
      setPokemonList((prevList) => [...prevList, ...data]);
    },
  });

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + 12);
  };

  if (isLoading && pokemonList.length === 0) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error!</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-screen-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      <div className="flex justify-center">
        <button onClick={handleLoadMore} className="mt-4 p-2 bg-blue-500 text-white rounded">
          Cargar más Pokémon
        </button>
      </div>
    </div>
  );
};

export default Home;
