import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, AuthContext } from './src/context/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ServiceForm from './src/screens/ServiceForm';
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
            title: 'Cadastro de Serviço',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginLeft: 10 }}>
                <Text style={{ color: '#2e7d32', fontSize: 16 }}>Voltar</Text>
              </TouchableOpacity>
            ),
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
