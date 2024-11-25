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
import {textStyles} from '../styles/text.styles';
import {buttonStyle} from '../styles/buttons.style';
import {containerStyles} from '../styles/container.styles';
import {Loader} from '../components';

type ContactDetailsScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'EditContact'
>;

export function ContactDetailsScreen(): React.JSX.Element {
  const {params} = useRoute<RouteProp<RootStackParamList, 'EditContact'>>();
  const contactId = params.contactId;
  const navigation = useNavigation<ContactDetailsScreenProp>();
  const [isDeleting, setIsDeleting] = useState<boolean | null>(null);
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
    setIsDeleting(true);
    await ContactsService.delete(contactId);
    setIsDeleting(false);
    navigation.goBack();
  };

  return (
    <>
      {isContactLoading ? (
        <Loader />
      ) : errorLoadingContact || !contactInfo ? (
        <Text style={textStyles.errorText}>
          No information for the contact could be found
        </Text>
      ) : (
        <ScrollView style={containerStyles.container}>
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
            <View style={containerStyles.complexButtonContainer}>
              <TouchableOpacity
                style={buttonStyle.button5}
                onPress={() => navigation.navigate('EditContact', {contactId})}>
                <Text style={textStyles.buttonText}>Edit Contact</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={buttonStyle.button5}
                onPress={() => setConfirmationModalVisible(true)}>
                <Text style={textStyles.buttonText}>Delete Contact</Text>
              </TouchableOpacity>
            </View>

            <ConfirmationModal
              confirmationModalVisible={confirmationModalVisible}
              setConfirmationModalVisible={setConfirmationModalVisible}
              handleAccept={handleDeleteContact}
              requiresCancel={true}
              isSubmitting={isDeleting}>
              <Text>Do you want to delete this contact?</Text>
            </ConfirmationModal>
          </View>
        </ScrollView>
      )}
    </>
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
