import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {RootStackParamList} from '../../interfaces';
import {useNavigation} from '@react-navigation/native';
import {IContact} from '../../screens';
import {Text} from 'react-native-elements';
import ContactImage from '../common/contactImage.component';

interface IContactDetailsButton extends Pick<IContact, 'name' | 'id'> {}

export function GoToContacDetailsButton({name, id}: IContactDetailsButton) {
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
          navigationToContactDetailsScreen.navigate('ContactDetails', {
            contactId: id,
          })
        }>
        <ContactImage />
        <Text>{name}</Text>
      </TouchableOpacity>
    </View>
  );
}
