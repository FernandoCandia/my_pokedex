import React, { useState } from 'react';
import { PokemonCardProps } from '../types';
import PokemonDetail from './PokemonDetail';


const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'grass':
        return 'bg-green-200 text-black dark:bg-green-500';
      case 'poison':
        return 'bg-purple-600 text-white dark:bg-purple-900';
      case 'fire':
        return 'bg-red-500 text-white dark:bg-red-800';
      case 'flying':
        return 'bg-blue-200 text-black dark:bg-blue-400';
      case 'water':
        return 'bg-blue-500 text-white dark:bg-blue-800';
      case 'bug':
        return 'bg-green-800 text-white dark:bg-green-600';
      case 'electric':
        return 'bg-yellow-200 text-white dark:bg-yellow-400';
      case 'ground':
        return 'bg-orange-500 text-white dark:bg-orange-500';
      case 'fairy':
        return 'bg-pink-500 text-white dark:bg-pink-500';
      case 'fighting':
        return 'bg-red-400 text-white dark:bg-red-400';
      case 'psychic':
        return 'bg-pink-800 text-white dark:bg-pink-800';
      case 'rock':
        return 'bg-blue-300 text-black dark:bg-blue-300';
      case 'steel':
        return 'bg-gray-400 text-black dark:bg-gray-400';
      case 'ice':
        return 'bg-blue-900 text-white dark:bg-blue-900';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const [showDetail, setShowDetail] = useState(false);

  const openDetail = () => {
    setShowDetail(true);
  };

  const closeDetail = () => {
    setShowDetail(false);
  };

  var urlImagen = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" + pokemon.id.toString().padStart(3, '0') + ".png";

  return (
    <div className="p-4 bg-gray-100 border border-gray-200 rounded-lg shadow-md dark:bg-gray-300 dark:border-gray-700" onClick={openDetail}>
      <img
        src={urlImagen}
        alt={pokemon.name}
        className="w-full h-full object-cover"
        style={{ width: '100%', maxHeight: '70%' }}
      />
      <p className='font-bold'>N.° {pokemon.id}</p>
      <h2 className="text-2xl font-bold text-left text-xl mt-4 capitalize">{pokemon.name}</h2>
      <ul className="flex flex-wrap mt-2">
        {pokemon.types.map((type, index) => (
          <li key={index} className={`inline-block text-xs font-medium mr-2 px-2.5 py-0.5 rounded ${getTypeStyle(type.type.name)} capitalize`}>
            {type.type.name}
          </li>
        ))}
      </ul>
      {showDetail && <PokemonDetail pokemon={pokemon} onClose={closeDetail} />}
   </div>
  );
};

export default PokemonCard;
