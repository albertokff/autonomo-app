import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, AuthContext } from './src/context/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ServiceForm from './src/screens/ServiceForm';
import ClientForm from './src/screens/ClientForm';
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
        <Stack.Screen 
          name="ServiceForm" 
          component={ServiceForm}
          options={({ navigation }) => ({
            title: 'Cadastro de Serviço'
          })}
        />
        <Stack.Screen
          name="ClientForm"
          component={ClientForm}
          options={({ navigation }) => ({
            title: 'Cadastro de Cliente'
          })}
        />
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
