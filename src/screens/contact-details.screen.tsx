import {Text, TouchableOpacity, View} from 'react-native';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../interfaces';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import ContactImage from '../components/common/contactImage.component';
import {useContactById} from '../hooks/useContactById.hook';
import React from 'react';

type ParamList = {
  Params: {contactId: number};
};

type ContactDetailsScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'EditContact'
>;

export function ContactDetailsScreen(): React.JSX.Element {
  const {params} = useRoute<RouteProp<ParamList, 'Params'>>();
  const contactId = params.contactId;

  const navigation = useNavigation<ContactDetailsScreenProp>();

  const {contactInfo, isContactLoading, errorLoadingContact} =
    useContactById(contactId);

  return (
    <View>
      {isContactLoading ? (
        <Text>Loading contact information...</Text>
      ) : errorLoadingContact || !contactInfo ? (
        <Text>No information for the contact could be found</Text>
      ) : (
        <View>
          <ContactImage />
          <Text>{contactInfo.name}</Text>
          <Text>{contactInfo.phoneNumber}</Text>
          <Text>{contactInfo.email}</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('EditContact', {
                contactId,
              })
            }>
            <Text>Edit contact</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
