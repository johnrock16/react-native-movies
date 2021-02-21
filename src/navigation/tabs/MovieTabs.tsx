import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MovieStack from '../stack/MovieStack';
// import FavoriteScreen from '../../screens/FavoriteScreen';
import ProfileStack from '../stack/ProfileStack';

const Tab = createBottomTabNavigator();

const MovieTabs = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions} tabBarOptions={tabBarOptions}>
        <Tab.Screen name="Home" component={MovieStack} />
        <Tab.Screen name="Favorites" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default MovieTabs;

const screenOptions=({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      const iconName = (route.name === 'Home') ? 'ios-list' : 'ios-add-circle-outline';
      color = focused? 'red' : 'black'
      return <Ionicons name={iconName} size={size} color={color} />;
    },
  });
const tabBarOptions={
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
}