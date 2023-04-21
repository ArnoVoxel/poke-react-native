import axios from 'axios';
import * as React from 'react';
import { Button, Pressable, Image, View, ScrollView, Text, StyleSheet, Animated, ViewStyle } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styles from '../styles/Styles';
import type {PropsWithChildren} from 'react';
import AddToFavoris from './AddToFavoris';

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

type ZoomInViewProps = PropsWithChildren<{style: ViewStyle}>;

const ZoomInView: React.FC<ZoomInViewProps> = props => {
  const zoomAnim = React.useRef(new Animated.Value(10)).current; // Initial value for scale
  const rotateAnim = React.useRef(new Animated.Value(0)).current; // Initial value for rotate

  React.useEffect(() => {
    Animated.timing(zoomAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [zoomAnim]);

  React.useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: 90,
      duration: 2000,
      delay: 2000,
      useNativeDriver: true,
    }).start();
  }, [rotateAnim]);


  return (
    <Animated.View
      style={{
        ...props.style,
        transform: [
          {scaleX: zoomAnim},
          {scaleY: zoomAnim},
          {rotateZ: rotateAnim.interpolate({
            inputRange: [0,3, 6, 30, 45, 50, 60, 65, 66, 68, 73, 90],
            outputRange: ['0deg','10deg','-10deg', '0deg', '0deg','15deg', '-15deg','0deg','0deg','10deg','-10deg', '0deg']
          })},
        ],
      }}>
      {props.children}
    </Animated.View>
  );
};

const RandomPokemon = ({ navigation }: Props) => {
  const [pokemon, setPokemon] = React.useState<Pokemon>({
    name: '',
    id: 0,
    sprites: {
      back_default: '',
      front_default: '',
    }
  });
  const [pokemonCaptured, setPokemonCaptured] = React.useState(false);

  let randomId: number = Math.floor(Math.random() * 898) + 1;
  const getPokemon = async () => {
    await axios.get('https://pokeapi.co/api/v2/pokemon/' + randomId + '/')
      .then((response) => {
        setPokemon(response.data);
      })
      .catch((error) => {
        console.log(error);
      }
    );
  };

  React.useEffect(() => {
    getPokemon();
  }, []);

  setTimeout(() => {
    setPokemonCaptured(true);
  }, 5000);

  let content: JSX.Element;
  if (pokemonCaptured) {
    content = (
      <View>
        <Text style={styles.title}>Tu as attrapé un pokemon sauvage!</Text>
        <Text style={styles.title}>Name: {pokemon.name}</Text>
        <Text style={styles.title}>ID: {pokemon.id}</Text>
        <Image
          style={styles.imageDetail}
          source={{uri:pokemon.sprites.front_default}}
          alt={"missing " + pokemon.name + " picture"}
        />
        <Image
          style={styles.imageDetail}
          source={{uri:pokemon.sprites.back_default}}
          alt={"missing " + pokemon.name + " picture"}
        />
        <AddToFavoris pokemon={pokemon} />
        <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
      />
      </View>
    );
  } else {
    content = (
      <View style={styles.sectionContainer}>
        <ZoomInView style={styles.detailImageContainer}>
          <Image style={styles.imageDetail} source={require('../assets/pokeball.png')} />
        </ZoomInView>
      </View>
    );
  }




    

  return (
    <View style={styles.sectionContainer}>
      {content}
    </View>
  );
}

export default RandomPokemon;