import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList} from '../../interfaces';
import {useNavigation} from '@react-navigation/native';
import {Text} from 'react-native-elements';
import {StyleSheet, TouchableOpacity} from 'react-native';

export const SmallButton = ({text}: {text: string}) => {
  type AddcontactScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'AddContact'
  >;

  const navigationToCreateContact =
    useNavigation<AddcontactScreenNavigationProp>();

  return (
    <TouchableOpacity
      onPress={() => navigationToCreateContact.navigate('AddContact')}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    textAlign: 'center',
  },
});
