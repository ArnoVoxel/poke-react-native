export default interface PokemonResource {
  id: number;
  name: string;
  sprites: PokemonSprites;
  types: Array<PokemonType>;
  abilities: Array<PokemonAbility>;
  stats: Array<PokemonStat>;
}

export interface PokemonSprites {
  back_default: string;
  front_default: string;
}

export interface PokemonType {
  slot: number;
  type: NameUrl;
}

export interface PokemonAbility {
  ability: NameUrl;
  is_hidden: boolean;
  slot: number;
}
export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NameUrl;
}

export interface NameUrl {
  name: string;
  url: string;
}
