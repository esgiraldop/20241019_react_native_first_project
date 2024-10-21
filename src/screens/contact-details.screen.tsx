import React from 'react';
import {Button, Text, View} from 'react-native';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../interfaces';
import {useNavigation} from '@react-navigation/native';

export function ContactDetailsScreen(): React.JSX.Element {
  type ContactDetailsScreenProp = NativeStackNavigationProp<
    RootStackParamList,
    'EditContact'
  >;

  const navigation = useNavigation<ContactDetailsScreenProp>();

  return (
    <View>
      <Text>This is the view for the contact details</Text>
      <Button
        title="Edit contact"
        onPress={() => navigation.navigate('EditContact')}
      />
    </View>
  );
}
