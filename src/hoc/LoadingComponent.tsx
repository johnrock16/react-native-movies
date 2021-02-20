import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { LoadingContainer } from '../styled/styles';

const LoadingComponent = ({ isLoading,children }) => {
  return isLoading ? (
    <LoadingContainer>
      <ActivityIndicator size={'large'} color={'#aaa'}/>
    </LoadingContainer>
  ) : (
    children
  );
};

export default React.memo(LoadingComponent);