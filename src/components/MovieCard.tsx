import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { MovieCardProps } from '../types/types';


const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: movie.Poster }} />
      {<View style={styles.textContainer}>
        <Text style={styles.title}>{movie.Title}</Text>
        <Text style={styles.bottomText}>{movie.Year} - {movie.Type}</Text>
      </View>}
    </View>
  )
}

const styles=StyleSheet.create({
  container:{ backgroundColor: 'white', borderWidth:2, borderRadius:20},
  image:{ height: 300,borderRadius:20 },
  textContainer:{position:'absolute',width:'100%',borderBottomLeftRadius:10,borderBottomRightRadius:10,zIndex:4,bottom:0,backgroundColor:'#FFFFFFa9'},
  title:{ fontSize: 18, textAlign: 'center', fontWeight: 'bold', height: 50, overflow: 'hidden' },
  bottomText:{ fontSize: 14, textAlign: 'center', textTransform: 'capitalize' },
})

export default MovieCard;