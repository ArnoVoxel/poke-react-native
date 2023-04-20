export default interface Pokemon {
  id: number;
  name: string;
  sprites: Sprites;
  types: Type[];
  abilities: Ability[];
  stats: Stat[];
}

export interface Sprites {
  back: string;
  front: string;
}

export interface Type {
  name: string;
}

export interface Ability {
  name: string;
}

export interface Stat {
  name: string;
  value: number;
}
