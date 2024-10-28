import {Text, TouchableOpacity, View} from 'react-native';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../interfaces';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import ContactImage from '../components/common/contactImage.component';
import {useContactById} from '../hooks/useContactById.hook';
import React, {useState} from 'react';
import {ContactsService} from '../services/contacts.service';
import {ConfirmationModal} from '../components/common/confirmation-modal.component';

type ContactDetailsScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'EditContact'
>;

export function ContactDetailsScreen(): React.JSX.Element {
  const {params} = useRoute<RouteProp<RootStackParamList, 'EditContact'>>();
  const contactId = params.contactId;

  const navigation = useNavigation<ContactDetailsScreenProp>();

  const {contactInfo, isContactLoading, errorLoadingContact} =
    useContactById(contactId);

  const [confirmationModalVisible, setConfirmatioModalVisible] =
    useState<boolean>(false);

  const handleDeleteContact = async () => {
    await ContactsService.delete(contactId);
    navigation.goBack();
  };

  return (
    <View>
      {isContactLoading ? (
        <Text>Loading contact information...</Text>
      ) : errorLoadingContact || !contactInfo ? (
        <Text>No information for the contact could be found</Text>
      ) : (
        <View>
          <ContactImage pictureUri={contactInfo.picture} />
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
          <TouchableOpacity onPress={() => setConfirmatioModalVisible(true)}>
            <Text>Delete contact</Text>
          </TouchableOpacity>
          <ConfirmationModal
            confirmationModalVisible={confirmationModalVisible}
            setConfirmatioModalVisible={setConfirmatioModalVisible}
            handleAccept={handleDeleteContact}
            requiresCancel={true}>
            <Text>Do you want to delete this contact?</Text>
          </ConfirmationModal>
        </View>
      )}
    </View>
  );
}
