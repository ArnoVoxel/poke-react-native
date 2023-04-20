import axios from 'axios';
import * as React from 'react';
import { Button, Pressable, Image, View, ScrollView, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styles from '../styles/Styles';

type Pokemon = {
  name: string;
  id: number;
  sprites: {
    back_default: string;
    front_default: string;
  }
}

type RootStackParamList = {
  Home: undefined;
  Feed: { sort: 'latest' | 'top' } | undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;


const RandomPokemon = ({ route, navigation }: Props) => {
  const [pokemon, setPokemon] = React.useState<Pokemon>({
    name: '',
    id: 0,
    sprites: {
      back_default: '',
      front_default: '',
    }
  });
  const [imageFront, setImagefront] = React.useState();
  // const [imageBack, setImageback] = React.useState<string>('');

  let randomId: number = Math.floor(Math.random() * 898) + 1;

  const getPokemon = () => {
    axios.get('https://pokeapi.co/api/v2/pokemon/' + randomId + '/')
      .then((response) => {
        setPokemon(response.data);
        setImagefront(response.data.sprites.front_default);
      })
      .catch((error) => {
        console.log(error);
      }
    );
  };


  function Content (): JSX.Element {
    if (pokemon.sprites.front_default === '') {
      return (
        <Text style={styles.title}>Aucun pokemon capturé</Text>
      );
    } else {
      return (
      <>
        <Text style={styles.title}>NOM : {pokemon.name}</Text>
        <Text style={styles.title}>ID : {pokemon.id}</Text>
        <Image style={styles.imageDetail} source={{ uri: pokemon.sprites.front_default }} />
        <Image  style={styles.imageDetail} source={{ uri: pokemon.sprites.back_default }} />
      </>
      );
    }
  };


  return (
    <View style={styles.sectionContainer}>
      
      <Content />
      <Pressable onPress={() => getPokemon()}>
        <Text style={styles.button}>
          CAPTURER {' '}
          <Image style={styles.pokeImage} source={require('../assets/pokeball.png')} />
        </Text>
      </Pressable>
      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

export default RandomPokemon;