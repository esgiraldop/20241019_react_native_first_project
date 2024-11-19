import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList} from '../../interfaces';
import {useNavigation} from '@react-navigation/native';
import {Text, TouchableOpacity} from 'react-native';
import {textStyles} from '../../styles/text.styles';
import {buttonStyle} from '../../styles/buttons.style';

export const SmallButton = ({text}: {text: string}) => {
  type AddContactScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'AddContact'
  >;

  const navigation = useNavigation<AddContactScreenNavigationProp>();

  return (
    <TouchableOpacity
      style={buttonStyle.button4}
      onPress={() => navigation.navigate('AddContact')}>
      <Text style={textStyles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};
