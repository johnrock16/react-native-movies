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
}