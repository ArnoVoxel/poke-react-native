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
  Pressable,
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

//display list of pokemon stored in async storage
function Favoris ({route, navigation}: Props) {
  const [pokemonList, setPokemonList] = React.useState<Pokemon[]>([]);

  async function displayPokemon () {
    try {
      let itemString = await AsyncStorage.getItem('pokemonList');
      if(itemString === null) {
        return null;
      }
      setPokemonList(JSON.parse(itemString));
    } catch (e) {
      console.log(e);
    }
  }

  if(pokemonList.length === 0) {
    displayPokemon();
  }

  if(pokemonList.length === 0) {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Liste vide</Text>
        <Pressable onPress={ClearList}>
        <Text style={styles.title}>Clear list</Text>
      </Pressable>
      </View>
    );
  }

  type ItemProps = {
    name: string;
  };

  const Item = ({ title }: ItemProps) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const renderItem = ({ item }: { item: Pokemon }) => (
    <Item title={item.name} />
  );

  function ClearList() {
    AsyncStorage.removeItem('pokemonList');
    setPokemonList([]);
  }

  return (
    <View style={styles.sectionContainer}>
      <FlatList
        data={pokemonList}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
      <Pressable style={styles.button} onPress={ClearList}>
        <Text style={styles.buttonText}>Clear list</Text>
      </Pressable>
    </View>
  );
}

export default Favoris;
