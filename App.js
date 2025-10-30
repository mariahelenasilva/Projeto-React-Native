// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import DetalhesScreen from './Screens/DetalhesScreen';
import CompraScreen from './Screens/CompraScreen';

import { CartProvider } from './Context/CartContext'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Detalhes" component={DetalhesScreen} />
          <Stack.Screen name="Compra" component={CompraScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}

