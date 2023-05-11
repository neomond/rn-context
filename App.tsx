import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import WishListScreen from './src/screens/WishListScreen';
import {ProductsProvider} from './src/context/ProductsContext';
import BasketScreen from './src/screens/CartScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

type RootStackParamList = {
  Home: undefined;
  Cart: undefined;
  Profile: undefined;
  Wishlist: undefined;
  ProductDetails: undefined;
};

type HomeStackParamList = {
  Home: undefined;
  Cart: undefined;
  Profile: undefined;
  Wishlist: undefined;
  ProductDetails: undefined;
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={{headerShown: false}}>
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen name="ProductDetails" component={DetailsScreen} />
  </HomeStack.Navigator>
);

const Tab = createBottomTabNavigator<RootStackParamList>();

const BottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      headerShown: false,
      tabBarIcon: ({focused, color, size}) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Cart') {
          iconName = focused ? 'cart' : 'cart-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        } else if (route.name === 'Wishlist') {
          iconName = focused ? 'heart' : 'heart-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}>
    <Tab.Screen name="Home" component={HomeStackScreen} />
    <Tab.Screen name="Cart" component={BasketScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
    <Tab.Screen name="Wishlist" component={WishListScreen} />
  </Tab.Navigator>
);

const App = () => (
  <NavigationContainer>
    <ProductsProvider>
      <BottomTabNavigator />
    </ProductsProvider>
  </NavigationContainer>
);

export default App;
