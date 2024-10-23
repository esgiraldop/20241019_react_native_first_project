import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {RootStackParamList} from '../interfaces';
import {useNavigation} from '@react-navigation/native';
import {IContact} from '../screens';
import {Text} from 'react-native-elements';

interface IContactDetailsButton extends Pick<IContact, 'name' | 'picture'> {}

export default function ContactDetailsButton({
  name,
  picture,
}: IContactDetailsButton) {
  type ContactDetailsScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'ContactDetails'
  >;

  const navigationToContactDetailsScreen =
    useNavigation<ContactDetailsScreenNavigationProp>();
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigationToContactDetailsScreen.navigate('ContactDetails')
        }>
        <Text>{picture}</Text>
        <Text>{name}</Text>
      </TouchableOpacity>
    </View>
  );
}
