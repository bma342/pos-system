import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import LoginScreen from './src/screens/LoginScreen';
import { TabletOrderManager } from './src/components/TabletOrderManager';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="TabletOrderManager" component={TabletOrderManager} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}