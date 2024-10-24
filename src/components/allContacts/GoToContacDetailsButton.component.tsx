import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {RootStackParamList} from '../../interfaces';
import {useNavigation} from '@react-navigation/native';
import {IContact} from '../../screens';
import {Text} from 'react-native-elements';
import ContactImage from '../common/image.component';

interface IContactDetailsButton extends Pick<IContact, 'name'> {}

export function GoToContacDetailsButton({name}: IContactDetailsButton) {
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
        <ContactImage />
        <Text>{name}</Text>
        {/* TODO:
        Make these icons work*/}
      </TouchableOpacity>
    </View>
  );
}
