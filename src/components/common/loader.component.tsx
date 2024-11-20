import React from 'react';
import {View} from 'react-native';
import LoaderKit from 'react-native-loader-kit';
import {theme} from '../../theme/main.theme';
import {containerStyles} from '../../styles/container.styles';

export const Loader = () => {
  return (
    <View style={[containerStyles.container3, {flex: 1}]}>
      <LoaderKit
        style={{width: 50, height: 50}}
        name={'BallPulse'}
        color={theme.colors.accent}
      />
    </View>
  );
};
