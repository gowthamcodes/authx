import React from 'react';
import { StatusBar } from 'react-native';
import { Colors } from '../constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, WelcomeScreen } from '../screens';
import { Provider, useSelector } from 'react-redux';
import { store } from '../store';

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
  </Stack.Navigator>
);

const RootNavigator = () => {
  const { userReducer } = useSelector(state => state);

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Colors.WHITE}
        translucent
      />
      {userReducer?.authToken ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const Navigators = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default Navigators;
