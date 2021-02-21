export interface MovieCardProps {
    movie:{
        Poster:string,
        Title:string,
        Year:string,
        Type:string,
        imdbID:string
    }
}

export interface HomeProps {
    navigation:{navigate:(local:string,{}:object)=>{}}
}

export interface Movie{
    Type: string,
    Year: string,
    Released: string,
    imdbRating: string,
    Genre: string,
    Language: string,
    Country: string,
    Runtime: string,
    Rated: string,
    Director: string,
    Writer: string,
    Production: string,
    imdbID:string,
    Poster:string,
    Title:string,
    Plot:string,
}

export interface FavoriteMoviesType{
    ListFavoriteMovies:[Movie],
    textSearch:string,
    filteredFavoriteMovies:[Movie],
    ListFavoriteMoviesIndex:string[]
}

export interface FavoriteMoviesContexType extends FavoriteMoviesType{
    onHandleChange:onHandleFavoriteMoviesType,
    reloadList:()=>{},
    searchMoviesFavorite:()=>{},
    addFavorite:(movie:Movie)=>{},
    checkFavorite:(imdbID:string)=>(boolean),
}

export interface onHandleFavoriteMoviesType{
    ListFavoriteMovies:(movie:[Movie])=>{},
    textSearch:(text:string)=>{},
    filteredFavoriteMovies:(movie:[Movie])=>{},
    ListFavoriteMoviesIndex:(list:string[])=>{},
}

export interface onHandleMoviesContextType{
    ListMovies:(movie:[Movie])=>{},
    infoMovie:(movie:Movie)=>{},
    imdbID:(text:string)=>{},
    textSearch:(text:string)=>{},
}

export interface MoviesStateContexType{
    ListMovies:[Movie],
    infoMovie:Movie,
    imdbID:string,
    textSearch:string,
}

export interface MoviesContexType extends MoviesStateContexType{
    onHandleChange:onHandleMoviesContextType,
    searchMovies:()=>{},
    getInfoMovie:(id:string)=>(Promise<Movie>),
}