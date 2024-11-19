import React, {PropsWithChildren} from 'react';
import {View} from 'react-native';
import {formStyles} from '../../styles/form.styles';
import {buttonStyle} from '../../styles/buttons.style';

interface IButtonsCarrousel extends PropsWithChildren {}

export const ButtonsCarrousel = ({children}: IButtonsCarrousel) => {
  return (
    <View style={formStyles.container2}>
      {React.Children.map(children, child => (
        <View style={buttonStyle.buttonWrapper}>{child}</View>
      ))}
    </View>
  );
};
