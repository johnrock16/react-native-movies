import React from 'react';
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

export default React.memo(MovieCard);