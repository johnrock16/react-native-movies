import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MovieCard from '../components/MovieCard';
import useSafeAreaStyles from '../hooks/UseSafeAreaStyles';
import { searchAPI } from '../ts/OMDBAPI';
import { buildHandleChanger } from '../ts/util';
import { HomeProps, Movie } from '../types/types';

const initialState = {
  textSearch: '',
  searches: [],
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const { textSearch, searches } = state;
  const onHandleChange=buildHandleChanger(initialState,setState);

  const verifySearch=(searchString:string, message:boolean)=>{
    const canSearch= searchString.length>2;
    if(message && !canSearch) alert('Type 3 letters at minimun');
    return canSearch
  }

  const onHandleSearch = (message:boolean=true) => {
    if(verifySearch(textSearch,message)){
      searchAPI('', { s: textSearch}).then((search) => {
        if (search?.result && search.result?.Search) {
          onHandleChange.searches(search.result?.Search);
        }
        else if(search?.error) alert(`${search.error}`)
      });
    }
  }
  // useEffect(()=>{
  //   onHandleSearch(false)
  // },[textSearch])

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TextInput placeholder={'Batman'} onSubmitEditing={onHandleSearch} onChangeText={onHandleChange.textSearch} style={styles.textInput} />
        <TouchableOpacity onPress={onHandleSearch} style={styles.button}>
          <Text style={styles.textButton}>Search</Text>
        </TouchableOpacity>
      </View>
      {
        (searches.length > 0) && (
          <FlatList
            data={searches}
            numColumns={2}
            keyExtractor={(item: Movie) => item.imdbID}
            renderItem={({ item }) => {
              if(item.Type==='movie' || item.Type==='series')
              return(
                <TouchableOpacity style={styles.buttonImage} onPress={() => { navigation.navigate('MovieScreen', { imdbID: item.imdbID }) }}>
                  <MovieCard movie={item} />
                </TouchableOpacity>
              );
            }}
          />
        )
      }
    </View>
  )
}

const styles=StyleSheet.create({
  container:{ flex: 1, backgroundColor: 'orange',padding:10 },
  topContainer: {width: '100%', justifyContent: 'center', flexDirection: 'row',padding:4 },

  textInput:{ backgroundColor: 'white', borderWidth:2, minWidth: 200, minHeight: 40,padding:4 },
  button:{ backgroundColor: 'black', justifyContent:'center',borderWidth:0.5,borderColor:'white' ,minWidth: 60, minHeight: 40 },
  textButton:{color:'white',textAlign:'center'},
  buttonImage:{ flexGrow: 1, margin: 10, flexBasis: 0 },
})

export default Home;