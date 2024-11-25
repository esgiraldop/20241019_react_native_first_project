import React, {useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import {IUpdateContact} from '../interfaces/contact.interface';
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
import {containerStyles} from '../styles/container.styles';

type AddContactScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'AddContact'
>;

export function AddContactScreen(): React.JSX.Element {
  const navigation = useNavigation<AddContactScreenProp>();
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);
  const [addPictureModalVisible, setAddPictureModalVisible] =
    useState<boolean>(false);
  const [marker, setMarker] = useState<IMarkerCoordinates | null>(null);

  const onSubmit = async (values: IUpdateContact) => {
    await ContactsService.create({
      ...values,
      imageUri,
      latitude: marker?.latitude,
      longitude: marker?.longitude,
    });
    navigation.goBack();
  };

  const initialValues = {
    name: '',
    phone: '',
    email: '',
    picture: '',
    latitude: 0,
    longitude: 0,
  };

  return (
    <ScrollView style={containerStyles.container}>
      <View>
        <AddPictureModal
          addPictureModalVisible={addPictureModalVisible}
          setAddPictureModalVisible={setAddPictureModalVisible}
          setImageUri={setImageUri}
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
                value={values.phone}
                defaultValue={initialValues.phone}
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

              <View
                style={[
                  formStyles.buttonContainer,
                  containerStyles.marginMedium,
                ]}>
                <TouchableOpacity
                  style={buttonStyle.button5}
                  onPress={() => handleSubmit()}
                  disabled={!isValid || isSubmitting}>
                  {isSubmitting ? (
                    <ActivityIndicator
                      size="large"
                      color={theme.colors.textPrimary}
                    />
                  ) : (
                    <Text style={textStyles.buttonText}>Submit</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}
