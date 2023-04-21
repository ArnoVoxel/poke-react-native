import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, FlatList, Pressable, ToastAndroid, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PokemonResource from '../Models/Pokemondata.type';
import Pokemon from '../Models/Pokemon.type';
import fromPokemonResource from '../Models/utilities/fromPokemonResource';
import fromPokemonFavorite from '../Models/utilities/fromPokemonFavorite';
import styles from '../styles/Styles';

// button to store the pokemon in async storage
function AddToFavoris ( pokemon: {pokemon: Pokemon}) {
  async function storePokemon () {
    try {
      let itemString = await AsyncStorage.getItem('pokemonList');
      if(itemString === null) {
        let pokemonList : Pokemon[] = [];
        pokemonList.push(fromPokemonFavorite.toPokemonList(pokemon.pokemon));
        await AsyncStorage.setItem('pokemonList', JSON.stringify(pokemonList));
        return null;
      }
      let item : Pokemon[] = JSON.parse(itemString);
      item.push(fromPokemonFavorite.toPokemonList(pokemon.pokemon));
      await AsyncStorage.setItem('pokemonList', JSON.stringify(item));
      // Toast message
      ToastAndroid.show('Pokemon ajouté aux favoris', ToastAndroid.SHORT);
    } catch (e) {
      console.log(e);
    }
  }

  return (
      <Pressable
        style={styles.button}
        onPress={() => {
          storePokemon();
        }}
      >
        <Text style={styles.buttonText}>💚 favoris</Text>
      </Pressable>
  );
}

export default AddToFavoris;
