import styled from 'styled-components/native';

export const TextInputStyled=styled.TextInput`
    background-color: #FFF;
    border-width:2px;
    border-color:#AAA;
    font-size:18px;
    color:#333652;
    minWidth: 200px;
    minHeight: 40px;
    padding:4px;
`;

export const ButtonStyled=styled.TouchableOpacity`
    display:flex;
    background-color: #333652;
    justify-content:center;
    border-width:0.5px;
    border-color:#333652;
    align-items:center;
    minWidth: 60px;
    minHeight: 40px;
`;

export const TextButtonStyled=styled.Text`
    color: white;
    textAlign: center;
`;

export const CardContainerStyled=styled.View`
    backgroundColor: #FFF;
    borderWidth:2px;
    borderRadius:20px;
`;

export const TitleStyled=styled.Text`
    fontSize: 18px;
    textAlign: center;
    fontWeight: bold;
    overflow: hidden;
    height:50px;
`;

export const TextDescriptionStyled=styled.Text`
    fontSize: 14px;
    textAlign: center;
    textTransform: capitalize;
`;

export const LoadingContainer=styled.View`
    flex: 1;
    backgroundColor: #00000011;
    justifyContent: center;
    alignItems:center;
`;