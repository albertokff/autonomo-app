import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, AuthContext } from './src/context/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ServiceForm from './src/screens/ServiceForm';
import ClientForm from './src/screens/ClientForm';
import AgendamentoForm from './src/screens/AgendamentoForm';
import PendenciasScreen from './src/screens/PendenciasScreen';
import RelatorioScreen from './src/screens/RelatorioScreen';
import FinanceiroScreen from './src/screens/FinanceiroScreen';
import { TouchableOpacity, Text } from 'react-native';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { userToken, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return null;
  }

  return (
  <Stack.Navigator>
    {userToken ? (
      <>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ServiceForm" component={ServiceForm} options={({ navigation }) => ({title: ''})}/>
        <Stack.Screen name="ClientForm" component={ClientForm} options={({ navigation }) => ({title: ''})}/>
        <Stack.Screen name="PendenciasScreen" component={PendenciasScreen} options={({ navigation }) => ({title: ''})}/>
        <Stack.Screen name="AgendamentoForm" component={AgendamentoForm} options={({ navigation }) => ({title: ''})}/>
        <Stack.Screen name="RelatorioScreen" component={RelatorioScreen} options={({ navigation }) => ({title: ''})}/>
        <Stack.Screen name="FinanceiroScreen" component={FinanceiroScreen} options={({ navigation }) => ({title: ''})}/>
      </>
    ) : (
      <Stack.Screen name="Login" component={LoginScreen} />
    )}
  </Stack.Navigator>
);

};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
