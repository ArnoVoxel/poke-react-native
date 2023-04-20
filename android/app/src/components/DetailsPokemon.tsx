import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  FlatList,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styles from '../styles/Styles';
import PokemonResource from '../Models/Pokemondata.type';
import Pokemon from '../Models/Pokemon.type';
import fromPokemonResource from '../Models/utilities/fromPokemonResource';

type RootStackParamList = {
  Home: undefined;
  Accueil: undefined;
  Feed: { sort: 'latest' | 'top' } | undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;

function DetailsPokemon ({route, navigation}: Props) {
  const [pokemonStored, setPokemonStored] = React.useState<Pokemon>();

  async function displayPokemon () {
    try {
      let itemString = await AsyncStorage.getItem('pokemon');
      if(itemString === null) {
        return null;
      }
      let item : PokemonResource = JSON.parse(itemString);
      setPokemonStored(fromPokemonResource.toPokemon(item));
    } catch (e) {
      console.log(e);
    }
  }

  if(pokemonStored === undefined) {
    displayPokemon();
  }

  if(pokemonStored === undefined) {
    return (
      <View>
        <Text>loading</Text>
      </View>
    );
  }

  type ItemProps = {
    title: string;
  };

  const Item = ({ title }:ItemProps) => (
    <View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.detailImageContainer} >
        <Text style={styles.title}>NOM : {pokemonStored.name}</Text>
        <Image style={styles.imageDetail} source={{uri: pokemonStored.sprites.front}} />
        <Image style={styles.imageDetail} source={{uri: pokemonStored.sprites.back}} />
      </View>
      <FlatList data={pokemonStored.types} renderItem={({item})=> <Item title={item.name}/>}/>
      <FlatList data={pokemonStored.stats} renderItem={({item})=> <Item title={item.name+' : '+item.value}/>}/>
      <FlatList data={pokemonStored.abilities} renderItem={({item})=> <Item title={item.name}/>}/>
      <Button
        title="home"
        onPress={() => navigation.navigate('Accueil')}
      />
    </View>
  );
}

 export default DetailsPokemon;