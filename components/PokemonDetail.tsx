import React from 'react';
import { PokemonDetailProps } from '../types';

const PokemonDetail: React.FC<PokemonDetailProps> = ({ pokemon, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-white p-5 rounded-lg shadow-md relative w-96" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-0 right-0 m-4 text-gray-600" onClick={onClose}>
          X
        </button>
        <h2 className="text-2xl font-bold text-left text-xl mt-4 capitalize">{pokemon.name}</h2>
        <img
          src={pokemon.image_url}
          alt={pokemon.name}
          className="w-full h-full object-cover mt-4"
          style={{ height: '400px' }}
        />
        <p className="font-bold">N.° {pokemon.id}</p>
        <h3 className="text-lg font-semibold mt-4">Types:</h3>
        <ul className="flex flex-wrap mt-2">
          {pokemon.types.map((type, index) => (
            <li
              key={index}
              className={`inline-block text-xs font-medium mr-2 px-2.5 py-0.5 rounded capitalize`}
            >
              {type.type.name}
            </li>
          ))}
        </ul>
        <h3 className="text-lg font-semibold mt-4">Abilities:</h3>
        <ul className="flex flex-wrap mt-2">
          {pokemon.abilities.map((ability, index) => (
            <li
              key={index}
              className={`inline-block text-xs font-medium mr-2 px-2.5 py-0.5 rounded capitalize`}
            >
              {ability.ability.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonDetail;
