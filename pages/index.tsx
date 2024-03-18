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
        const { data: pokemonData } = await axios.get<Pokemon>(pokemon.url);
        const id = pokemonData.id;
        const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id.toString().padStart(3, '0')}.png`;
        return {
          id: id,
          name: pokemon.name,
          url: pokemon.url,
          image_url: imageUrl,
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
      <div className="pt-6 flex justify-center">
        <button onClick={handleLoadMore} className="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-md font-semibold text-white">
          Cargar más Pokémon
        </button>
      </div>
    </div>
  );
};

export default Home;
