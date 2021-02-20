import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MovieCard from '../components/MovieCard';
import { MoviesContext } from '../context/MoviesContext';
import { HomeProps, Movie } from '../types/types';
import {TextInputStyled, TextButtonStyled, ButtonStyled}  from '../styled/styles';
import { HomeContainer, TopContainer, ButtonImage } from '../styled/screens/HomeStyles';

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const moviesContext= useContext(MoviesContext);
  const {ListMovies,textSearch,searchMovies,onHandleChange} = moviesContext;

  return (
    <HomeContainer>
      <TopContainer>
        <TextInputStyled value={textSearch} placeholder={'Batman'} onSubmitEditing={searchMovies} onChangeText={onHandleChange.textSearch}/>
        <ButtonStyled onPress={searchMovies}>
          <TextButtonStyled>Search</TextButtonStyled>
        </ButtonStyled>
      </TopContainer>
      {
        (ListMovies.length > 0) && (
          <FlatList
            data={ListMovies}
            numColumns={2}
            keyExtractor={(item: Movie) => item.imdbID}
            renderItem={({ item }) => {
              if(item.Type==='movie' || item.Type==='series')
              return(
                <ButtonImage onPress={() => { navigation.navigate('MovieScreen', { imdbID: item.imdbID }) }}>
                  <MovieCard movie={item} />
                </ButtonImage>
              );
            }}
          />
        )
      }
    </HomeContainer>
  )
}

export default Home;