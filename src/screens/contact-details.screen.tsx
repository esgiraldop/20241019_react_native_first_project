import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../interfaces';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import ContactImage from '../components/common/contactImage.component';
import {IContact} from './all-contacts.screen';
import {ContactsService} from '../services/contacts.service';

type ParamList = {
  Params: {contactId: string};
};

export function ContactDetailsScreen(): React.JSX.Element {
  type ContactDetailsScreenProp = NativeStackNavigationProp<
    RootStackParamList,
    'EditContact'
  >;

  const {params} = useRoute<RouteProp<ParamList, 'Params'>>();
  const contactId = parseInt(params.contactId, 2);

  const [contactInfo, setContactInfo] = useState<IContact | null>(null);
  const [isLoading, setIsLoading] = useState<boolean | null>(false);

  const navigation = useNavigation<ContactDetailsScreenProp>();

  useEffect(() => {
    async function getContactInfo(id: number) {
      const contactInfoResponse = await ContactsService.getById(id);
      setIsLoading(true);
      if (contactInfoResponse) {
        setContactInfo(contactInfoResponse);
        setIsLoading(false);
      }
    }

    getContactInfo(contactId);
  }, []);

  if (!contactInfo) {
    return (
      <View>
        <Text>No information for the contact could be found</Text>
      </View>
    );
  }

  return (
    <View>
      {isLoading ? (
        <Text>Loading contact information...</Text>
      ) : (
        <View>
          <ContactImage />
          <Text>{contactInfo.name}</Text>
          <Text>{contactInfo.phoneNumber}</Text>
          <Text>{contactInfo.email}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('EditContact')}>
            <Text>Edit contact</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
