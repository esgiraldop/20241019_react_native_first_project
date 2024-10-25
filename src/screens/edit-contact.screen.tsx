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
import {Button} from 'react-native-elements';
import {useContactById} from '../hooks/useContactById.hook';
import {RouteProp, useRoute} from '@react-navigation/native';
import {IContact, IUpdateContact} from '../interfaces/contact.interface';
import {ContactsService} from '../services/contacts.service';

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .required()
    .min(3, 'Name must contain at least 3 characters'),
  email: Yup.string().required('Email is required').email('Invalid email'),
  phoneNumber: Yup.number().required('Phone number is required'),
});

type ParamList = {
  Params: {contactId: number};
};

interface InewContactValues extends Omit<IContact, 'id'> {}

export function EditContactScreen(): React.JSX.Element {
  const {params} = useRoute<RouteProp<ParamList, 'Params'>>();
  const contactId = params.contactId;

  const {contactInfo, isContactLoading, setIsContactLoading} =
    useContactById(contactId);
  const [errorLoadingContact, setErrorLoadingContact] =
    useState<boolean>(false);

  const onSubmit = async (values: IUpdateContact) => {
    await ContactsService.update(contactId, values);
  };

  let contactInfoNoId;

  useEffect(() => {
    if (!contactInfo) {
      setErrorLoadingContact(true);
    } else {
      setErrorLoadingContact(false);
    }

    setIsContactLoading(false);
  }, [contactInfo, setIsContactLoading]);

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

  const initialValues: InewContactValues = {...contactInfoNoId};

  return (
    <View>
      {isContactLoading ? (
        <Text>Loading...</Text>
      ) : errorLoadingContact ? (
        <Text>No information for the contact could be found</Text>
      ) : (
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
                  defaultValue={initialValues.name}
                  // placeholder={}
                  // style={}
                />
                {errors.name && <Text style={style.error}>{errors.name}</Text>}

                <Text>Phone number</Text>
                <TextInput
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  value={String(values.phoneNumber)}
                  defaultValue={String(initialValues.phoneNumber)}
                  // placeholder={}
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
                  // placeholder={}
                  // style={}
                />
                {errors.email && (
                  <Text style={style.error}>{errors.email}</Text>
                )}

                <Text>picture</Text>
                <TextInput
                  onChangeText={handleChange('picture')}
                  onBlur={handleBlur('picture')}
                  value={values.picture}
                  defaultValue={initialValues.picture}
                  // placeholder={}
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
      )}
    </View>
  );
}

const style = StyleSheet.create({
  error: {fontSize: 10, color: 'red'},
});
