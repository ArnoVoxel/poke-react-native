import PokemonResource from "../Models/Pokemondata.type";
import styles from "../styles/Styles";
import { Type } from "../Models/Pokemon.type";
import fromPokemonResource from "../Models/utilities/fromPokemonResource";
import { useNavigation } from '@react-navigation/native';
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
  Image,
} from 'react-native';

function DisplayPokemon(pokemon: {
  name: string;
  pokemonRequest: PokemonResource;
}) {
  const navigation = useNavigation();
  const pokemonElement = pokemon.pokemonRequest;
  let content: JSX.Element;
  if (pokemonElement.id === 0) {
    content = <Text style={styles.title}>Pas de pokemon sélectionné</Text>;
  } else {
    const pokemon = fromPokemonResource.toPokemon(pokemonElement);
    if(!pokemon) console.log('no pokemon in DisplaySearchResult');

    content = (
      <View>
        <Text style={styles.searchResults}>
          NOM : {pokemon.name}{" "}
          <Button title='DETAILS' onPress={() => navigation.navigate('Details')} />
        </Text>
        <Text style={styles.searchResults}>ID : {pokemon.id}</Text>
        <Image
          source={{uri:pokemon.sprites.front}}
          alt={"missing " + pokemon.name + " picture"}
        />
        <Image
          source={{uri:pokemon.sprites.back}}
          alt={"missing " + pokemon.name + " picture"}
        />
        <Text style={styles.searchResults}>TYPES : </Text>
        {pokemon.types.map((type: Type, idx: number) => (
          <Text style={styles.searchResults} key={idx} >
            {type.name}
          </Text>
        ))}
      </View>
    );
  }

  return <Text style={styles.searchResults}>{content}</Text>;
}

export default DisplayPokemon;