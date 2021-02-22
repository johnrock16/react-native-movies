import React, { useContext, useEffect } from 'react';
import { FlatList} from 'react-native';
import MovieCard from '../components/MovieCard';
import { FavoriteMoviesContexType, HomeProps, Movie } from '../types/types';
import {TextInputStyled, TextButtonStyled, ButtonStyled}  from '../styled/styles';
import { HomeContainer, TopContainer, ButtonImage } from '../styled/screens/HomeStyles';
import { FavoriteMoviesContext } from '../context/FavoriteMoviesContext';

const FavoriteScreen: React.FC<HomeProps> = ({ navigation }) => {
  const favoriteMoviesContext = useContext(FavoriteMoviesContext) as FavoriteMoviesContexType;
  const {
    ListFavoriteMovies,
    searchMoviesFavorite,
    reloadList,
    filteredFavoriteMovies,
    onHandleChange,
    textSearch
  } = favoriteMoviesContext;

  useEffect(()=>{
    reloadList();
  },[])

  useEffect(()=>{
    if(textSearch.length==0) searchMoviesFavorite()
  },[textSearch])

  return (
    <HomeContainer>
      <TopContainer>
        <TextInputStyled value={textSearch} placeholder={'Batman'} onSubmitEditing={searchMoviesFavorite} onChangeText={onHandleChange.textSearch}/>
        <ButtonStyled onPress={searchMoviesFavorite}>
          <TextButtonStyled>Search</TextButtonStyled>
        </ButtonStyled>
      </TopContainer>
      {
        (ListFavoriteMovies.length > 0) && (
          <FlatList
            data={filteredFavoriteMovies}
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

export default React.memo(FavoriteScreen);