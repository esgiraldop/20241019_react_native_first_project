import React, {PropsWithChildren} from 'react';
import {View} from 'react-native';
import {buttonStyle} from '../../styles/buttons.style';
import {containerStyles} from '../../styles/container.styles';

interface IButtonsCarrousel extends PropsWithChildren {}

export const ButtonsCarrousel = ({children}: IButtonsCarrousel) => {
  return (
    <View style={containerStyles.complexButtonContainerRight}>
      {React.Children.map(children, child => (
        <View style={buttonStyle.buttonWrapper}>{child}</View>
      ))}
    </View>
  );
};
