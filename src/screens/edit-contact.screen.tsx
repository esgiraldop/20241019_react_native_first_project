import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Button} from 'react-native-elements';

export function EditContactScreen(): React.JSX.Element {
  const contactSchema = Yup.object().shape({
    name: Yup.string()
      .required()
      .min(8, 'Name must contain at least 5 characters'),
    email: Yup.string().required('Email is required').email('Invalid email'),
    phoneNumber: Yup.number(),
  });

  const initialValues = {name: '', phoneNumber: '', email: '', picture: ''};

  // const handleSubmit = (values, {setSubmitting}) => {
  //   // Handle form submission here
  // };

  return (
    <View>
      <Text>This is the form for editing a contact</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={contactSchema}
        onSubmit={values => console.log(values)}>
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

            <Text>phoneNumber</Text>
            <TextInput
              onChangeText={handleChange('phoneNumber')}
              onBlur={handleBlur('phoneNumber')}
              value={values.phoneNumber}
              defaultValue={initialValues.phoneNumber}
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
            {errors.email && <Text style={style.error}>{errors.email}</Text>}

            <Text>picture</Text>
            <TextInput
              onChangeText={handleChange('picture')}
              onBlur={handleBlur('picture')}
              value={values.picture}
              defaultValue={initialValues.picture}
              // placeholder={}
              // style={}
            />

            <Button
              onPress={handleSubmit}
              disabled={!isValid}
              title={'Submit'}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}

const style = StyleSheet.create({
  error: {fontSize: 10, color: 'red'},
});
