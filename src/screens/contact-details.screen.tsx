import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
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
import WeatherCard from '../components/common/weatherCard.component';
import {formStyles} from '../styles/form.styles';
import {textStyles} from '../styles/text.styles';
import {buttonStyle} from '../styles/buttons.style';

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
    if (contactInfo?.data.latitude && contactInfo?.data.longitude) {
      setMarker({
        latitude: +contactInfo?.data.latitude, //It's vital the coordinate gets here as a number
        longitude: +contactInfo?.data.longitude,
      });
    }
  }, [contactInfo]);

  const handleDeleteContact = async () => {
    await ContactsService.delete(contactId);
    navigation.goBack();
  };

  return (
    <ScrollView style={formStyles.container}>
      {isContactLoading ? (
        <Text style={textStyles.loadingText}>
          Loading contact information...
        </Text>
      ) : errorLoadingContact || !contactInfo ? (
        <Text style={textStyles.errorText}>
          No information for the contact could be found
        </Text>
      ) : (
        <View style={contactDetailsStyles.contactContainer}>
          <ContactImage pictureUri={contactInfo.data.imageUri} size={150} />
          <Text style={textStyles.nameText}>{contactInfo.data.name}</Text>
          <Text style={textStyles.phoneText}>{contactInfo.data.phone}</Text>
          <Text style={textStyles.emailText}>{contactInfo.data.email}</Text>

          <Text style={textStyles.emailText}>Contact's current location</Text>
          <GoogleMap marker={marker} setMarker={setMarker} onEdit={false} />

          {!!marker && (
            <View>
              <Text style={textStyles.emailText}>Local weather</Text>
              <WeatherCard lat={marker?.latitude} lon={marker?.longitude} />
            </View>
          )}

          <TouchableOpacity
            style={[buttonStyle.button]}
            onPress={() => navigation.navigate('EditContact', {contactId})}>
            <Text style={textStyles.buttonText}>Edit Contact</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={buttonStyle.button}
            onPress={() => setConfirmationModalVisible(true)}>
            <Text style={textStyles.buttonText}>Delete Contact</Text>
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
    </ScrollView>
  );
}

export const contactDetailsStyles = StyleSheet.create({
  contactContainer: {
    alignItems: 'center',
    borderBottomColor: theme.colors.borderColor,
    borderBottomWidth: 1,
    paddingBottom: theme.spacing.large,
  },
});
