import React, { createContext, useState } from 'react';
import { searchAPI } from '../ts/OMDBAPI';
import { buildHandleChanger } from '../ts/util';
import { Movie, onHandleMoviesContextType } from '../types/types';

const defaultValue={
  ListMovies:[] as [Movie] | [],
  infoMovie:{} as Movie,
  imdbID:'' as string,
  textSearch:'' as string,
}

export const MoviesContext= createContext(defaultValue);

export const MoviesContextProvider=({children})=>{
  const [state,setState] = useState(defaultValue);
  const {textSearch} = state;
  const onHandleChange=buildHandleChanger(defaultValue,setState) as onHandleMoviesContextType;

  const verifySearch=(searchString:string, message:boolean)=>{
    const canSearch= searchString.length>2;
    if(message && !canSearch) alert('Type 3 letters at minimun');
    return canSearch;
  }

  const searchMovies=async (message=false,forced=true)=>{
    if(verifySearch(textSearch,message)){
        searchAPI('', { s: textSearch}).then((search) => {
          if (search?.result && search.result?.Search) {
            onHandleChange.ListMovies(search.result?.Search);
          }
          else if(search?.error) alert(`${search.error}`)
        });
    }
  }

  const getInfoMovie=async (imdbID:string)=>{
    const search=await searchAPI('', { i: imdbID });
    if (search?.result) onHandleChange.infoMovie(search.result);
    else if(search?.error) alert(`${search.error}`)
  }
  
  return(
    <MoviesContext.Provider value={{...state,searchMovies,getInfoMovie,onHandleChange}}>
      {children}
    </MoviesContext.Provider>
  )
}