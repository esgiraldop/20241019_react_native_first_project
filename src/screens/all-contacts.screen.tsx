import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Button, Text, View} from 'react-native';
import {RootStackParamList} from '../interfaces';

export function AllContactsScreen(): React.JSX.Element {
  type AllContactsScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'ContactDetails'
  >;

  type AddcontactScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'AddContact'
  >;

  const navigationToAllContactsScreen =
    useNavigation<AllContactsScreenNavigationProp>();

  const navigationToCreateContact =
    useNavigation<AddcontactScreenNavigationProp>();

  return (
    <View>
      <Text>This is the view for all the contacts</Text>
      <Button
        title="Contact details"
        onPress={() => navigationToAllContactsScreen.navigate('ContactDetails')}
      />
      <Button
        title="Add contact"
        onPress={() => navigationToCreateContact.navigate('AddContact')}
      />
    </View>
  );
}
