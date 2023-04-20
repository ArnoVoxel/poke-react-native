import React, { useEffect } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import styles from '../styles/Styles'
import http from "../http-common";
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
  TextInput,
  ToastAndroid,
  Pressable,
  Image,
} from 'react-native';
import DisplaySearchResult from '../components/DisplaySearchResult';
import PokemonResource from '../Models/Pokemondata.type';
import Pokemon from '../Models/Pokemon.type';

type RootStackParamList = {
  Home: undefined;
  Feed: { sort: 'latest' | 'top' } | undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;

const Search = ({ route, navigation }: Props) => {
  // const { navigation } = props;
  // const [pokemon, setPokemon] = React.useState<Pokemon| any>();
  const [searchInput, setSearchInput] = React.useState<string>('');
  const [pokemonName, setPokemonName] = React.useState<string>("");
  const [pokemonRequest, setPokemonRequest] = React.useState({
    name: "",
    id: 0,
    sprites: {
      back_default: "",
      front_default: "",
    },
  } as PokemonResource);
  let displayInput: string | number = '';
  useEffect(()=>{
    displayInput = searchInput;
  }, [searchInput]);
  
  function SearchRequest() {
		if(searchInput === ""){ToastAndroid.showWithGravity('entrez un pokemon', ToastAndroid.SHORT, ToastAndroid.CENTER); return;}
    http.get('/pokemon/'+searchInput)
    .then((result)=> {
      setPokemonName(result.data.name);
      setPokemonRequest(result.data);
      ToastAndroid.show('Vous avez capturé '+ result.data.name,ToastAndroid.SHORT)
      setSearchInput('');
    })
    .catch((error) => {
      console.log(error);
      ToastAndroid.showWithGravityAndOffset('Ce pokemon n\'existe pas...', ToastAndroid.SHORT, ToastAndroid.TOP, 25, 50);
    })
	}

  async function storeData () {
    try {
      await AsyncStorage.removeItem('pokemon');
      await AsyncStorage.setItem('pokemon', JSON.stringify(pokemonRequest))
    } catch (e) {
      console.log(e);
    }
  }

  storeData();

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Entrez un nom (anglais) ou un numéro : </Text>
      <TextInput style={styles.input} value={searchInput} onChangeText={setSearchInput} onKeyPress={SearchRequest} />
      <Text>{displayInput}</Text>
      <Pressable onPress={SearchRequest}>
        <Text style={styles.button}>
          CAPTURER 
          <Image source={require('../assets/pokeball.png')} style={styles.pokeImage} />  
        </Text>
      </Pressable>
      <Button
        title="home"
        onPress={() => navigation.goBack()}
      />
      <DisplaySearchResult name={pokemonName} pokemonRequest={pokemonRequest} />
    </View>
  );
}

export default Search;