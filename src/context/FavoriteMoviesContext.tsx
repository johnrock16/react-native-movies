import React, { createContext, useEffect, useState } from 'react';
import {addItemCache, buildHandleChanger, getItemCache, removeItemCache} from '../ts/util';
import {FavoriteMoviesType,Movie, onHandleFavoriteMoviesType} from '../types/types';
const levenshtein = require('js-levenshtein');

const defaultValue={
  ListFavoriteMovies:[] as [Movie] | [],
  textSearch:'',
  filteredFavoriteMovies:[] as [Movie] | [],
  ListFavoriteMoviesIndex:[] as string[] | [],
} as FavoriteMoviesType;

export const FavoriteMoviesContext= createContext(defaultValue);

export const FavoriteMoviesContextProvider=({children})=>{
  const [state,setState] = useState(defaultValue);
  const {ListFavoriteMovies,textSearch,ListFavoriteMoviesIndex} = state;
  const onHandleChange=buildHandleChanger(defaultValue,setState) as onHandleFavoriteMoviesType;

  const addFavorite=async ({Title,Year,Poster,imdbID,Type}:Movie)=>{
    const dataMovie={Title,Year, Poster,Type, imdbID}
    const hasAdded=await addItemCache('favoriteMovies',dataMovie,'imdbID')
    if(hasAdded){
      await addItemCache('favoriteMoviesIndexes',imdbID);
      onHandleChange.ListFavoriteMoviesIndex([...ListFavoriteMoviesIndex,imdbID]);
    }
    return hasAdded;
  }

  const removeFavorite=async (movie:Movie)=>{
    const hasRemoved=await removeItemCache('favoriteMovies',movie,'imdbID')
    if(hasRemoved){
      await removeItemCache('favoriteMoviesIndexes',movie.imdbID);
      onHandleChange.ListFavoriteMoviesIndex([...ListFavoriteMoviesIndex,movie.imdbID]);
    }
    return hasRemoved;
  }

  const toogleFavorite=async (movie:Movie,favorite,callback)=>{
    const result= favorite? await removeFavorite(movie) : await addFavorite(movie);
    reloadList();
    callback(favorite!=result);
  }

  const checkFavorite= async (imdbID:string)=>{
    const result= await getItemCache('favoriteMoviesIndexes',true);
    console.log('aqui',result)
    if(result && Array.isArray(result)){
      return result.indexOf(imdbID)>-1;
    }
    return false;
  }

  const searchMoviesFavorite=()=>{
    const result = textSearch.length<4? ListFavoriteMovies : ListFavoriteMovies.filter(({Title})=>(
      (levenshtein(textSearch.toLowerCase(),Title.toLowerCase())<Title.length*0.75)
    )) as [Movie];
    onHandleChange.filteredFavoriteMovies(result)
  }

  const reloadList=()=>{
    getItemCache('favoriteMovies',true).then((result:[Movie])=>{
      if(result && Array.isArray(result)){
        onHandleChange.ListFavoriteMovies(result);
        onHandleChange.filteredFavoriteMovies(result);
      }
    })
  }

  useEffect(()=>{
    reloadList();
  },[])
  
  return(
    <FavoriteMoviesContext.Provider value={{...state,addFavorite,toogleFavorite,removeFavorite,checkFavorite,reloadList,searchMoviesFavorite,onHandleChange}}>
      {children}
    </FavoriteMoviesContext.Provider>
  )
}