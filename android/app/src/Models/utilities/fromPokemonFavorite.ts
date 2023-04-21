import Pokemon from "../Pokemon.type";
type PokemonFavorite = {
  id: number;
  name: string;
};

function toPokemonList(input: Pokemon): PokemonFavorite {
  return {
    id: input.id,
    name: input.name,
  };
}

const fromPokemonFavorite = { toPokemonList };

export default fromPokemonFavorite;