import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../screens/Home';
import MovieScreen from '../../screens/MovieScreen';

const Stack = createStackNavigator();

const MovieStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen options={navigationHeaderStyle('SEARCH MOVIES')} name="Home" component={Home} />
        <Stack.Screen options={navigationHeaderStyle('')} name="MovieScreen" component={MovieScreen} />
    </Stack.Navigator>
  );
};

export default MovieStack;

const navigationHeaderStyle=(title:string)=>({ title,headerStyle: {backgroundColor: '#e9eaec'},headerTintColor:'#333652' })