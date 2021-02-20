import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { MovieCardImage, MovieCardTextContainer } from '../styled/components/MovieCardStyles';
import { CardContainerStyled, TitleStyled, TextDescriptionStyled } from '../styled/styles';
import { MovieCardProps } from '../types/types';


const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <CardContainerStyled>
      <MovieCardImage source={{ uri: movie.Poster }} />
      <MovieCardTextContainer>
        <TitleStyled>{movie.Title}</TitleStyled>
        <TextDescriptionStyled>{movie.Year} - {movie.Type}</TextDescriptionStyled>
      </MovieCardTextContainer>
    </CardContainerStyled>
  )
}

const styles=StyleSheet.create({
  container:{ backgroundColor: 'white', borderWidth:2, borderRadius:20},
  image:{ height: 300,borderRadius:20 },
  textContainer:{position:'absolute',width:'100%',borderBottomLeftRadius:10,borderBottomRightRadius:10,zIndex:4,bottom:0,backgroundColor:'#FFFFFFa9'},
  title:{ fontSize: 18, textAlign: 'center', fontWeight: 'bold', height: 50, overflow: 'hidden' },
  bottomText:{ fontSize: 14, textAlign: 'center', textTransform: 'capitalize' },
})

export default React.memo(MovieCard);