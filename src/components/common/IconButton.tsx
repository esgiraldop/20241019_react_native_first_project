import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList} from '../../interfaces';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {buttonStyle} from '../../styles/buttons.style';

interface IIconButton {
  children: React.ReactNode;
  size?: number;
}

export const IconButton = ({children, size = 50}: IIconButton) => {
  type AddContactScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'AddContact'
  >;

  const navigation = useNavigation<AddContactScreenNavigationProp>();

  return (
    <TouchableOpacity
      style={[
        buttonStyle.roundButton,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
      onPress={() => navigation.navigate('AddContact')}>
      {children}
    </TouchableOpacity>
  );
};
