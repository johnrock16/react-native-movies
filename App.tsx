import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/screens/Home';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import MovieScreen from './src/screens/MovieScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen options={navigationHeaderStyle('SEARCH MOVIES')} name="Home" component={Home} />
            <Stack.Screen options={navigationHeaderStyle('MOVIE INFO')} name="MovieScreen" component={MovieScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
});

const navigationHeaderStyle=(title:string)=>({ title,headerStyle: {backgroundColor: 'black'},headerTintColor:'white' })