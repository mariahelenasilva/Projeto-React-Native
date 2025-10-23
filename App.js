import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importando suas telas
import HomeScreen from './Screns/HomeScreen';
import DetailsScreen from './Screns/DetailsScreen';
import CompraScreen from './Screns/CompraScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Tela principal */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Loja de Beleza 💄' }} 
        />

        {/* Tela de detalhes */}
        <Stack.Screen 
          name="Detalhes" 
          component={DetailsScreen} 
          options={{ title: 'Detalhes do Produto' }} 
        />

        {/* Tela de compra */}
        <Stack.Screen 
          name="Compra" 
          component={CompraScreen} 
          options={{ title: 'Confirmação de Compra' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
