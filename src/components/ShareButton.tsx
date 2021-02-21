import React from 'react';
import { Share } from 'react-native';
import { ButtonStyled } from '../styled/styles';

const ShareButton = ({children,message}) => {
  const onShare = async () => {
    try {
      await Share.share({message});
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <ButtonStyled onPress={onShare}>
      {children}
    </ButtonStyled>
  );
};

export default ShareButton;