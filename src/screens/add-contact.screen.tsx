import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {IUpdateContact} from '../interfaces/contact.interface';
import {ContactsService} from '../services/contacts.service';
import {RootStackParamList} from '../interfaces';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ContactImage from '../components/common/contactImage.component';
import {AddPictureModal} from '../components/common/addPictureModal.component';
import {theme} from '../theme/main.theme';
import {formStyles} from './edit-contact.screen';
// import {styles} from '../styles';

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .required()
    .min(3, 'Name must contain at least 3 characters'),
  email: Yup.string().required('Email is required').email('Invalid email'),
  phoneNumber: Yup.number().required('Phone number is required'),
});

type AddContactScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'AddContact'
>;

export function AddContactScreen(): React.JSX.Element {
  const navigation = useNavigation<AddContactScreenProp>();
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);
  const [addPictureModalVisible, setAddPictureModalVisible] =
    useState<boolean>(false);

  const onSubmit = async (values: IUpdateContact) => {
    await ContactsService.create({...values, picture: imageUri});
    navigation.goBack();
  };

  const initialValues = {name: '', phoneNumber: -1, email: '', picture: ''};

  return (
    <View style={formStyles.container}>
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

              <Text style={formStyles.label}>Name</Text>
              <TextInput
                style={formStyles.input}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
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
                  onPress={() => handleSubmit()}
                  disabled={!isValid || isSubmitting}>
                  <Text>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}
