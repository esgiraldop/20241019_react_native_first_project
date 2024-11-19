import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Formik} from 'formik';
import {useContactById} from '../hooks/useContactById.hook';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {IContact, IUpdateContact} from '../interfaces/contact.interface';
import {ContactsService} from '../services/contacts.service';
import {RootStackParamList} from '../interfaces';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ContactImage from '../components/common/contactImage.component';
import {AddPictureModal} from '../components/common/addPictureModal.component';
import {theme} from '../theme/main.theme';
import {
  GoogleMap,
  IMarkerCoordinates,
} from '../components/common/googleMap.component';
import {formStyles} from '../styles/form.styles';
import {textStyles} from '../styles/text.styles';
import {buttonStyle} from '../styles/buttons.style';
import {contactSchema} from '../schemas/contact.schema';

interface InewContactValues extends Omit<IContact, 'id'> {}

type EditContactScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'EditContact'
>;

export function EditContactScreen(): React.JSX.Element {
  const navigation = useNavigation<EditContactScreenProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'EditContact'>>();
  const {contactId} = route.params;

  const {contactInfo, isContactLoading, errorLoadingContact} =
    useContactById(contactId);
  const [addPictureModalVisible, setAddPictureModalVisible] =
    useState<boolean>(false);

  const [imageUri, setImageUri] = useState<string>(
    contactInfo ? contactInfo.data.imageUri : '',
  );

  const [marker, setMarker] = useState<IMarkerCoordinates | null>(null);

  useEffect(() => {
    if (contactInfo?.data?.latitude && contactInfo?.data?.longitude) {
      setMarker({
        latitude: +contactInfo?.data?.latitude,
        longitude: +contactInfo?.data?.longitude,
      });
    }
  }, [contactInfo]);

  useEffect(() => {
    // So the image in the form refreshes
    if (contactInfo?.data.imageUri) {
      setImageUri(contactInfo.data.imageUri);
    }
  }, [contactInfo]);

  const onSubmit = async (values: IUpdateContact) => {
    await ContactsService.update(contactId, {
      ...values,
      imageUri: imageUri,
      latitude: marker?.latitude,
      longitude: marker?.longitude,
    });
    navigation.goBack();
  };

  let contactInfoNoId: InewContactValues;

  if (!contactInfo) {
    contactInfoNoId = {
      name: '',
      phone: '',
      email: '',
      imageUri: '',
      latitude: 0,
      longitude: 0,
    };
  } else {
    const {id, ...rest} = contactInfo.data;
    contactInfoNoId = rest;
  }

  const initialValues: InewContactValues = {
    ...contactInfoNoId,
    imageUri,
  };

  return (
    <ScrollView style={formStyles.container}>
      {isContactLoading ? (
        <Text style={textStyles.loadingText}>Loading...</Text>
      ) : errorLoadingContact ? (
        <Text style={textStyles.errorText}>
          No information for the contact could be found
        </Text>
      ) : (
        <View>
          <View>
            <AddPictureModal
              addPictureModalVisible={addPictureModalVisible}
              setAddPictureModalVisible={setAddPictureModalVisible}
              setImageUri={setImageUri}
              pictureUri={imageUri}
            />
          </View>
          <View>
            <Formik
              initialValues={initialValues}
              validationSchema={contactSchema}
              onSubmit={onSubmit}>
              {({
                isSubmitting,
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                errors,
                isValid,
              }) => (
                <View style={formStyles.formContainer}>
                  <TouchableOpacity
                    onPress={() => setAddPictureModalVisible(true)}
                    disabled={!isValid || isSubmitting}>
                    <ContactImage pictureUri={imageUri} size={150} />
                  </TouchableOpacity>

                  <Text style={textStyles.label}>Name</Text>
                  <TextInput
                    style={textStyles.input}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    defaultValue={initialValues.name}
                    placeholder="Enter name"
                    placeholderTextColor={theme.colors.textSecondary}
                  />
                  {errors.name && (
                    <Text style={formStyles.error}>{errors.name}</Text>
                  )}

                  <Text style={textStyles.label}>Phone number</Text>
                  <TextInput
                    style={textStyles.input}
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    value={String(values.phone)}
                    defaultValue={String(initialValues.phone)}
                    placeholder="Enter phone number"
                    placeholderTextColor={theme.colors.textSecondary}
                    keyboardType="phone-pad"
                  />
                  {errors.phone && (
                    <Text style={formStyles.error}>{errors.phone}</Text>
                  )}

                  <Text style={textStyles.label}>email</Text>
                  <TextInput
                    style={textStyles.input}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    defaultValue={initialValues.email}
                    placeholder="Enter email"
                    placeholderTextColor={theme.colors.textSecondary}
                    keyboardType="email-address"
                  />
                  {errors.email && (
                    <Text style={formStyles.error}>{errors.email}</Text>
                  )}

                  <Text style={textStyles.label}>
                    Add the contact's current location
                  </Text>
                  <GoogleMap marker={marker} setMarker={setMarker} />

                  <View style={formStyles.buttonContainer}>
                    <TouchableOpacity
                      style={buttonStyle.saveButton}
                      onPress={() => handleSubmit()}
                      disabled={!isValid || isSubmitting}>
                      <Text style={textStyles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
