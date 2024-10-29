import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useContactById} from '../hooks/useContactById.hook';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {IContact, IUpdateContact} from '../interfaces/contact.interface';
import {ContactsService} from '../services/contacts.service';
import {RootStackParamList} from '../interfaces';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ContactImage from '../components/common/contactImage.component';
import {AddPictureModal} from '../components/common/addPictureModal.component';
import {theme} from '../theme/main.theme';

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .required()
    .min(3, 'Name must contain at least 3 characters'),
  email: Yup.string().required('Email is required').email('Invalid email'),
  phoneNumber: Yup.number().required('Phone number is required'),
});

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

  const [imageUri, setImageUri] = useState<string | undefined>(
    contactInfo?.picture,
  );

  useEffect(() => {
    // So the image in the form refreshes
    if (contactInfo?.picture) {
      setImageUri(contactInfo.picture);
    }
  }, [contactInfo]);

  const onSubmit = async (values: IUpdateContact) => {
    await ContactsService.update(contactId, {...values, picture: imageUri});
    navigation.goBack();
  };

  let contactInfoNoId;

  if (!contactInfo) {
    contactInfoNoId = {
      name: '',
      phoneNumber: -1,
      email: '',
      picture: '',
    };
  } else {
    const {id, ...rest} = contactInfo;
    contactInfoNoId = rest;
  }

  const initialValues: InewContactValues = {
    ...contactInfoNoId,
    picture: imageUri,
  };

  return (
    <View style={formStyles.container}>
      {isContactLoading ? (
        <Text style={formStyles.loadingText}>Loading...</Text>
      ) : errorLoadingContact ? (
        <Text style={formStyles.errorText}>
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

                  <Text style={formStyles.label}>Name</Text>
                  <TextInput
                    style={formStyles.input}
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

                  <Text style={formStyles.label}>Phone number</Text>
                  <TextInput
                    style={formStyles.input}
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                    value={String(values.phoneNumber)}
                    defaultValue={String(initialValues.phoneNumber)}
                    placeholder="Enter phone number"
                    placeholderTextColor={theme.colors.textSecondary}
                    keyboardType="phone-pad"
                  />
                  {errors.phoneNumber && (
                    <Text style={formStyles.error}>{errors.phoneNumber}</Text>
                  )}

                  <Text style={formStyles.label}>email</Text>
                  <TextInput
                    style={formStyles.input}
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

                  <View style={formStyles.buttonContainer}>
                    <TouchableOpacity
                      style={formStyles.saveButton}
                      onPress={() => handleSubmit()}
                      disabled={!isValid || isSubmitting}>
                      <Text style={formStyles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </View>
      )}
    </View>
  );
}

export const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
  },
  loadingText: {
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  errorText: {
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  formContainer: {
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: theme.spacing.large,
  },
  label: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.text,
    marginBottom: theme.spacing.small,
  },
  input: {
    backgroundColor: theme.colors.buttonBackground,
    color: theme.colors.textPrimary,
    padding: theme.spacing.small,
    borderRadius: theme.spacing.small,
    width: '100%',
    marginBottom: theme.spacing.medium,
  },
  error: {
    fontSize: 12,
    color: 'red',
    marginBottom: theme.spacing.small,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: theme.colors.buttonBackground,
    padding: theme.spacing.medium,
    borderRadius: theme.spacing.small,
    alignItems: 'center',
    marginRight: theme.spacing.small,
  },
  saveButton: {
    flex: 1,
    backgroundColor: theme.colors.accent,
    padding: theme.spacing.medium,
    borderRadius: theme.spacing.small,
    alignItems: 'center',
    marginLeft: theme.spacing.small,
  },
  buttonText: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.text,
    fontWeight: 'bold',
  },
});
