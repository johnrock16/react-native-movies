import React from 'react';
import { Text, TextInput } from 'react-native';
import { View } from 'react-native';

const Header = () => {
  return (
    <View style={{ backgroundColor: 'black', flexDirection: 'row' }}>
      <Text style={{ fontSize: 32, color: 'white' }}>HEADER</Text>
      <TextInput style={{ minHeight: 50, minWidth: 200, backgroundColor: 'white' }} />
    </View>
  )
}

export default Header;