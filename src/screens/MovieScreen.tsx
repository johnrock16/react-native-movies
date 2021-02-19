import React, { useContext, useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { MoviesContext } from '../context/MoviesContext';

const MovieScreen = ({ route }) => {
  const moviesContext= useContext(MoviesContext);
  const {infoMovie,getInfoMovie} = moviesContext;
  const { imdbID } = route.params;

  useEffect(() => {
    getInfoMovie(imdbID);
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: infoMovie.Poster }} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{infoMovie.Title}</Text>

        <Text style={styles.textPlot}>{infoMovie.Plot}</Text>
        {
          (Object.keys(infoMovie).length > 0) && (
            <FlatList
              data={Object.keys(MOVIE_INFOS)}
              keyExtractor={(item, index) => `movieInfo${item}${index}`}
              renderItem={({ item }) => (
                <Text style={styles.textInfo}>{item}: {infoMovie[item]}</Text>
              )}
            />
          )
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInfo: {
    fontSize: 14, textAlign: 'left', textTransform: 'capitalize', color: 'black'
  },
  title: { fontSize: 18, textAlign: 'center', fontWeight: 'bold', color: 'black' },
  container: { flex: 1 },
  textContainer: { backgroundColor: 'white', flex: 1, padding: 20 },
  image: { width: '100%',flexGrow: 1, flexBasis: 0 },
  textPlot: { fontSize: 14, textTransform: 'capitalize', textAlign: 'center', padding: 10, color: 'black' }
})
const MOVIE_INFOS = {
  Type: 'Type',
  Year: 'Year',
  Released: 'Released',
  imdbRating: 'imdbRating',
  Genre: 'Genre',
  Language: 'Language',
  Country: 'Country',
  Runtime: 'Runtime',
  Rated: 'Rated',
  Director: 'Director',
  Writer: 'Writer',
  Production: 'Production',
}

export default MovieScreen;