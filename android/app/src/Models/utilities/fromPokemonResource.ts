import Pokemon from "../../Models/Pokemon.type";
import PokemonResource from "../../Models/Pokemondata.type";

const capitalize = (s: string) => {
  if (s.length <= 2) return s.toUpperCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
};

function toPokemon(input: PokemonResource): Pokemon {
  return {
    id: input.id,
    name: capitalize(input.name),
    sprites: {
      back: input.sprites.back_default,
      front: input.sprites.front_default,
    },
    types: input.types.map((t) => {
      return {
        name: capitalize(t.type.name),
      };
    }),
    abilities: input.abilities.map((a) => {
      return {
        name: capitalize(a.ability.name),
      };
    }),
    stats: input.stats.map((s) => {
      return { name: capitalize(s.stat.name), value: s.base_stat };
    }),
  };
}

const fromPokemonResource = { toPokemon };

export default fromPokemonResource;
