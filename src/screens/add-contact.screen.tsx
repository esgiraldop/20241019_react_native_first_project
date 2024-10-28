import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {IUpdateContact} from '../interfaces/contact.interface';
import {ContactsService} from '../services/contacts.service';
import {RootStackParamList} from '../interfaces';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
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
  const styles = StyleSheet.create({
    error: {fontSize: 10, color: 'red'},
    regularText: {color: 'black', fontSize: 10},
  });

  const navigation = useNavigation<AddContactScreenProp>();
  const [imageUri, setImageUri] = useState<string>('');

  const onSubmit = async (values: IUpdateContact) => {
    await ContactsService.create({...values, picture: imageUri});
    navigation.goBack();
  };

  const openCamera = async () => {
    const response = await launchCamera({
      mediaType: 'photo',
      cameraType: 'front',
    });
    if (response.assets && response.assets.length > 0) {
      setImageUri(response.assets[0].uri || '');
    }
  };

  const initialValues = {name: '', phoneNumber: -1, email: '', picture: ''};

  return (
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
          <View>
            <Text>Name</Text>
            <TextInput
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              placeholder={'Name'}
            />
            {errors.name && <Text style={styles.error}>{errors.name}</Text>}

            <Text style={styles.regularText}>Phone number</Text>
            <TextInput
              onChangeText={handleChange('phoneNumber')}
              onBlur={handleBlur('phoneNumber')}
              value={String(values.phoneNumber)}
              defaultValue={String(initialValues.phoneNumber)}
              placeholder={'123456789'}
            />
            {errors.phoneNumber && (
              <Text style={styles.error}>{errors.phoneNumber}</Text>
            )}

            <Text style={styles.regularText}>email</Text>
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              defaultValue={initialValues.email}
              placeholder={'email@example.com'}
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <Text style={styles.regularText}>picture</Text>
            {/* <TextInput
              onChangeText={handleChange('picture')}
              onBlur={handleBlur('picture')}
              value={values.picture}
              defaultValue={initialValues.picture}
              placeholder={'picture'}
              style={styles.regularText}
            /> */}

            <TouchableOpacity
              onPress={openCamera}
              disabled={!isValid || isSubmitting}>
              <Text>Open camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleSubmit()}
              disabled={!isValid || isSubmitting}>
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}
