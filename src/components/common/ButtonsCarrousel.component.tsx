import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';

interface IButtonsCarrousel extends PropsWithChildren {}

export const ButtonsCarrousel = ({children}: IButtonsCarrousel) => {
  return (
    <View style={styles.container}>
      {React.Children.map(children, child => (
        <View style={styles.subcontainer}>{child}</View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
  },
  subcontainer: {
    flex: 1,
    margin: 5,
  },
});
