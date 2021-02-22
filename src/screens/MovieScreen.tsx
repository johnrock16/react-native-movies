import { Entypo, MaterialIcons } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, View} from 'react-native';
import ShareButton from '../components/ShareButton';
import { MOVIE_INFOS } from '../constants/MovieScreen';
import { FavoriteMoviesContext } from '../context/FavoriteMoviesContext';
import { MoviesContext } from '../context/MoviesContext';
import LoadingComponent from '../hoc/LoadingComponent';
import { ImageContainer, MovieContainer, TextContainer, MovieTitle, TextPlot, TextGenre, MovieTextInfo} from '../styled/screens/MovieScreenStyles';
import { ButtonStyled } from '../styled/styles';
import { buildHandleChanger, removeItemCache } from '../ts/util';
import { FavoriteMoviesContexType, MoviesContexType } from '../types/types';

const defaultValue={ isLoading:true, isFavorite:false }

const MovieScreen = ({ route }) => {
  const [ state,setState ] = useState(defaultValue)
  const moviesContext= useContext(MoviesContext);
  const favoriteMoviesContext= useContext(FavoriteMoviesContext);

  const { infoMovie, getInfoMovie } = moviesContext as MoviesContexType;
  const {addFavorite,toogleFavorite,ListFavoriteMovies, checkFavorite} = favoriteMoviesContext as FavoriteMoviesContexType;
  const { imdbID } = route.params;
  const onHandleChange=buildHandleChanger(defaultValue,setState) as {isLoading:(bool:boolean)=>{},isFavorite:(isFavorite:boolean)=>{}};
  const {isLoading,isFavorite} = state;

  useEffect(() => {
    getInfoMovie(imdbID).then(async (result)=>{
      onHandleChange.isLoading(false);
      onHandleChange.isFavorite(await checkFavorite(`${imdbID}`));
    }).catch((error)=>{console.log(error)})
  }, [imdbID]);

  const change=(favorite)=>{
    onHandleChange.isFavorite(favorite);
  }

  return (
    <MovieContainer>
      <LoadingComponent isLoading={isLoading}>
        <ImageContainer source={{ uri: infoMovie.Poster }} />
        <TextContainer>
          <View style={{flexDirection:'row',width:'100%',justifyContent:'flex-end'}}>
            
            <ButtonStyled onPress={()=>toogleFavorite(infoMovie,isFavorite,change)}>
              <MaterialIcons name={(isFavorite)?"favorite":"favorite-outline"} size={24} color="white" />
            </ButtonStyled>
            <ShareButton message={message(infoMovie.Title,infoMovie.Plot)}>
              <Entypo name="share" size={24} color="white"/>
            </ShareButton>
            
          </View>
          
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

const message=(title,plot)=>(`Do you have watched ${title}? that's about a ${plot}`)