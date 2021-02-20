import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/screens/Home';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import MovieScreen from './src/screens/MovieScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MoviesContext, MoviesContextProvider } from './src/context/MoviesContext';


const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <MoviesContextProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen options={navigationHeaderStyle('SEARCH MOVIES')} name="Home" component={Home} />
              <Stack.Screen options={navigationHeaderStyle('')} name="MovieScreen" component={MovieScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </MoviesContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
});

const navigationHeaderStyle=(title:string)=>({ title,headerStyle: {backgroundColor: '#e9eaec'},headerTintColor:'#333652' })