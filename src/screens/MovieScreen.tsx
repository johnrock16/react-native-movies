import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { searchAPI } from '../ts/OMDBAPI';
import { buildHandleChanger } from '../ts/util';


const initialState = {
  movieInfo: {}
}

const MovieScreen = ({ route }) => {
  const [state, setState] = useState(initialState);
  // const stylesSA = useSafeAreaStyles();
  const { imdbID } = route.params;
  const { movieInfo } = state;
  const onHandleChange = buildHandleChanger(initialState,setState);

  useEffect(() => {
    searchAPI('', { i: imdbID }).then((search) => {
      if (search?.result) onHandleChange.movieInfo(search.result);
      else if(search?.error) alert(`${search.error}`)
    });
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: movieInfo.Poster }} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{movieInfo.Title}</Text>

        <Text style={styles.textPlot}>{movieInfo.Plot}</Text>
        {
          (Object.keys(movieInfo).length > 0) && (
            <FlatList
              data={Object.keys(MOVIE_INFOS)}
              keyExtractor={(item, index) => `movieInfo${item}${index}`}
              renderItem={({ item }) => (
                <Text style={styles.textInfo}>{item}: {movieInfo[item]}</Text>
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