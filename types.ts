export interface Pokemon {
    id: number;
    name: string;
    url: string;
    sprites: {
      front_default: string;
    };
    types: {
      type: {
        name: string
      }
    }[];
    abilities: {
      ability: {
        name: string
      }
    }[];
  }

export interface PokemonCardProps {
  pokemon: Pokemon;
}

export interface PokemonDetailProps {
  pokemon: Pokemon;
  onClose: () => void;
}
