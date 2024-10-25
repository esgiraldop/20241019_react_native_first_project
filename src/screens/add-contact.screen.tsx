import React from 'react';
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

  const onSubmit = async (values: IUpdateContact) => {
    await ContactsService.create(values);
    navigation.goBack();
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
              // style={}
            />
            {errors.name && <Text style={style.error}>{errors.name}</Text>}

            <Text>Phone number</Text>
            <TextInput
              onChangeText={handleChange('phoneNumber')}
              onBlur={handleBlur('phoneNumber')}
              value={String(values.phoneNumber)}
              defaultValue={String(initialValues.phoneNumber)}
              placeholder={'123456789'}
              // style={}
            />
            {errors.phoneNumber && (
              <Text style={style.error}>{errors.phoneNumber}</Text>
            )}

            <Text>email</Text>
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              defaultValue={initialValues.email}
              placeholder={'email@example.com'}
              // style={}
            />
            {errors.email && <Text style={style.error}>{errors.email}</Text>}

            <Text>picture</Text>
            <TextInput
              onChangeText={handleChange('picture')}
              onBlur={handleBlur('picture')}
              value={values.picture}
              defaultValue={initialValues.picture}
              placeholder={'picture'}
              // style={}
            />

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

const style = StyleSheet.create({
  error: {fontSize: 10, color: 'red'},
});
