import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import CartScreen from '../screens/CartScreen';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailsScreen}
        options={{
          title: 'Detail',
        }}
      />
      <Stack.Screen
        name="Settings"
        component={CartScreen}
        options={{
          title: 'Shopping Cart',
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
