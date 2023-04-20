import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import styles from '../styles/Styles';
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
  Pressable,
} from 'react-native';

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  RandomPokemon: undefined;
  Feed: { sort: 'latest' | 'top' } | undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;

const Accueil = ({ route, navigation }: Props) => {

  // const {navigation} = props;
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>
        <Image style={styles.image} source={require('../assets/pokeball.png')} />
          <Text style={styles.title}> POkeScript </Text>
        <Image style={styles.image} source={require('../assets/pokeball.png')} />
      </Text>
      <Pressable onPress={() => navigation.navigate('Search')}>
        <Text style={styles.button}>Rechercher un pokemon</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('RandomPokemon')}>
        <Text style={styles.button}>PokeHAZARD</Text>
      </Pressable>
    </View>
  );
}

export default Accueil;
