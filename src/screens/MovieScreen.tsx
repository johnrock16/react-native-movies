import React, { useContext, useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { MOVIE_INFOS } from '../constants/MovieScreen';
import { MoviesContext } from '../context/MoviesContext';
import { ImageContainer, MovieContainer, TextContainer, MovieTitle, TextPlot, TextGenre, MovieTextInfo} from '../styled/screens/MovieScreenStyles';

const MovieScreen = ({ route }) => {
  const moviesContext= useContext(MoviesContext);
  const {infoMovie,getInfoMovie} = moviesContext;
  const { imdbID } = route.params;

  useEffect(() => {
    getInfoMovie(imdbID);
  }, []);

  return (
    <MovieContainer>
    <ImageContainer source={{ uri: infoMovie.Poster }} />
      <TextContainer>
        <MovieTitle>{infoMovie.Title}</MovieTitle>
        <TextGenre>{infoMovie.Genre}</TextGenre>
        <TextPlot>{infoMovie.Plot}</TextPlot>
        {
          (Object.keys(infoMovie).length > 0) && (
            <FlatList
              data={Object.keys(MOVIE_INFOS)}
              keyExtractor={(item, index) => `movieInfo${item}${index}`}
              renderItem={({ item }) => (
                <MovieTextInfo>{item}: {infoMovie[item]}</MovieTextInfo>
              )}
            />
          )
        }
      </TextContainer>
    </MovieContainer>
  );
}

export default MovieScreen;