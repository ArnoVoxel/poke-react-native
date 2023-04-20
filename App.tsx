import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Accueil from './android/app/src/components/Accueil';
import Search from './android/app/src/components/Search';
import RandomPokemon from './android/app/src/components/RandomPokemon';
import DetailsPokemon from './android/app/src/components/DetailsPokemon';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Accueil">
        <Stack.Screen name="Accueil" component={Accueil} />
        <Stack.Screen name="Search" component={Search} options={{title: 'Recherche'}}/>
        <Stack.Screen name='Details' component={DetailsPokemon} />
        <Stack.Screen name="RandomPokemon" component={RandomPokemon} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;