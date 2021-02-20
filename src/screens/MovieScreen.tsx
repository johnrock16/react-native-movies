import React, { useContext, useEffect, useState } from 'react';
import { FlatList} from 'react-native';
import { MOVIE_INFOS } from '../constants/MovieScreen';
import { MoviesContext } from '../context/MoviesContext';
import LoadingComponent from '../hoc/LoadingComponent';
import { ImageContainer, MovieContainer, TextContainer, MovieTitle, TextPlot, TextGenre, MovieTextInfo} from '../styled/screens/MovieScreenStyles';
import { buildHandleChanger } from '../ts/util';

const defaultValue={ isLoading:true }

const MovieScreen = ({ route }) => {
  const [ state,setState ] = useState(defaultValue)
  const moviesContext= useContext(MoviesContext);

  const { infoMovie, getInfoMovie } = moviesContext;
  const { imdbID } = route.params;
  const onHandleChange=buildHandleChanger(defaultValue,setState);

  useEffect(() => {
    getInfoMovie(imdbID).then((result)=>{
      onHandleChange.isLoading(false);
    }).catch((error)=>{console.log(error)})
  }, []);

  return (
    <MovieContainer>
      <LoadingComponent isLoading={state.isLoading}>
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
      </LoadingComponent>
    </MovieContainer>
  );
}

export default React.memo(MovieScreen);