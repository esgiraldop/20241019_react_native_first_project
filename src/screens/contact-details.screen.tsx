import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../interfaces';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import ContactImage from '../components/common/contactImage.component';
import {useContactById} from '../hooks/useContactById.hook';
import {ContactsService} from '../services/contacts.service';
import {ConfirmationModal} from '../components/common/confirmation-modal.component';
import {theme} from '../theme/main.theme';
import {
  GoogleMap,
  IMarkerCoordinates,
} from '../components/common/googleMap.component';

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

  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState<boolean>(false);

  const [marker, setMarker] = useState<IMarkerCoordinates | null>(null);

  useEffect(() => {
    if (contactInfo?.latitude && contactInfo?.longitude) {
      setMarker({
        latitude: contactInfo?.latitude,
        longitude: contactInfo?.longitude,
      });
    }
  }, [contactInfo]);

  const handleDeleteContact = async () => {
    await ContactsService.delete(contactId);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {isContactLoading ? (
        <Text style={styles.loadingText}>Loading contact information...</Text>
      ) : errorLoadingContact || !contactInfo ? (
        <Text style={styles.errorText}>
          No information for the contact could be found
        </Text>
      ) : (
        <View style={styles.contactContainer}>
          <ContactImage pictureUri={contactInfo.picture} size={150} />
          <Text style={styles.nameText}>{contactInfo.name}</Text>
          <Text style={styles.phoneText}>{contactInfo.phoneNumber}</Text>
          <Text style={styles.emailText}>{contactInfo.email}</Text>

          <Text style={styles.emailText}>Contact's current location</Text>
          <GoogleMap marker={marker} setMarker={setMarker} onEdit={false} />

          <TouchableOpacity
            style={[styles.button]}
            onPress={() => navigation.navigate('EditContact', {contactId})}>
            <Text style={styles.buttonText}>Edit Contact</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setConfirmationModalVisible(true)}>
            <Text style={styles.buttonText}>Delete Contact</Text>
          </TouchableOpacity>

          <ConfirmationModal
            confirmationModalVisible={confirmationModalVisible}
            setConfirmationModalVisible={setConfirmationModalVisible}
            handleAccept={handleDeleteContact}
            requiresCancel={true}>
            <Text>Do you want to delete this contact?</Text>
          </ConfirmationModal>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
  },
  contactContainer: {
    alignItems: 'center',
    borderBottomColor: theme.colors.borderColor,
    borderBottomWidth: 1,
    paddingBottom: theme.spacing.large,
  },
  loadingText: {
    color: theme.colors.textSecondary,
  },
  errorText: {
    color: theme.colors.textSecondary,
  },
  nameText: {
    fontSize: theme.fontSizes.title,
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.small,
  },
  phoneText: {
    fontSize: theme.fontSizes.text,
    color: theme.colors.textSecondary,
    marginVertical: theme.spacing.small,
  },
  emailText: {
    fontSize: theme.fontSizes.text,
    color: theme.colors.textSecondary,
  },
  button: {
    backgroundColor: theme.colors.buttonBackground,
    padding: theme.spacing.medium,
    marginTop: theme.spacing.medium,
    borderRadius: theme.spacing.small,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.textPrimary,
  },
});
