import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MovieCard from '../components/MovieCard';
import { MoviesContext } from '../context/MoviesContext';
import { HomeProps, Movie } from '../types/types';

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const moviesContext= useContext(MoviesContext);
  const {ListMovies,textSearch,searchMovies,onHandleChange} = moviesContext;

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TextInput value={textSearch} placeholder={'Batman'} onSubmitEditing={searchMovies} onChangeText={onHandleChange.textSearch} style={styles.textInput} />
        <TouchableOpacity onPress={searchMovies} style={styles.button}>
          <Text style={styles.textButton}>Search</Text>
        </TouchableOpacity>
      </View>
      {
        (ListMovies.length > 0) && (
          <FlatList
            data={ListMovies}
            numColumns={2}
            keyExtractor={(item: Movie) => item.imdbID}
            renderItem={({ item }) => {
              if(item.Type==='movie' || item.Type==='series')
              return(
                <TouchableOpacity style={styles.buttonImage} onPress={() => { navigation.navigate('MovieScreen', { imdbID: item.imdbID }) }}>
                  <MovieCard movie={item} />
                </TouchableOpacity>
              );
            }}
          />
        )
      }
    </View>
  )
}

const styles=StyleSheet.create({
  container:{ flex: 1, backgroundColor: 'orange',padding:10 },
  topContainer: {width: '100%', justifyContent: 'center', flexDirection: 'row',padding:4 },

  textInput:{ backgroundColor: 'white', borderWidth:2, minWidth: 200, minHeight: 40,padding:4 },
  button:{ backgroundColor: 'black', justifyContent:'center',borderWidth:0.5,borderColor:'white' ,minWidth: 60, minHeight: 40 },
  textButton:{color:'white',textAlign:'center'},
  buttonImage:{ flexGrow: 1, margin: 10, flexBasis: 0 },
})

export default Home;