import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Tela_BemVindo from './components/Tela_BemVindo';
import Tela_Login from './components/Tela_Login';
import Tela_Registro from './components/Tela_Registro';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Tela_BemVindo"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Tela_BemVindo" component={Tela_BemVindo} />
        <Stack.Screen name="Tela_Login" component={Tela_Login} />
        <Stack.Screen name="Tela_Registro" component={Tela_Registro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}