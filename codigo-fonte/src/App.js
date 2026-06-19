import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Tela_BemVindo from './src/components/Tela_BemVindo';
import Tela_Login from './src/components/Tela_Login';
import Tela_Registro from './src/components/Tela_Registro';
import Tela_Inicio from './src/components/Tela_Inicio';
import Tela_Perfil from './src/components/Tela_Perfil';
import Tela_Geladeira from './src/components/Tela_Geladeira';
import Tela_Config from './src/components/Tela_Config';

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
        <Stack.Screen name="Tela_Inicio" component={Tela_Inicio} />
        <Stack.Screen name="Tela_Perfil" component={Tela_Perfil} />
        <Stack.Screen name="Tela_Geladeira" component={Tela_Geladeira} />
        <Stack.Screen name="Tela_Config" component={Tela_Config} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
