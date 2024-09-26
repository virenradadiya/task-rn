import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Local Imports
import {SRoute} from '../NavigationRoutes';
import {SNav} from '../NavigationKeys';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={SNav.HomeScreen}>
      <Stack.Screen name={SNav.HomeScreen} component={SRoute.HomeScreen} />
      <Stack.Screen
        name={SNav.ProductScreen}
        component={SRoute.ProductScreen}
      />
      <Stack.Screen
        name={SNav.ProductDetailScreen}
        component={SRoute.ProductDetailScreen}
      />
    </Stack.Navigator>
  );
}
