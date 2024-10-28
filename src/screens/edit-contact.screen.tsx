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
    <View>
      {isContactLoading ? (
        <Text>Loading...</Text>
      ) : errorLoadingContact ? (
        <Text>No information for the contact could be found</Text>
      ) : (
        <View>
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
                <View>
                  <TouchableOpacity
                    onPress={() => setAddPictureModalVisible(true)}
                    disabled={!isValid || isSubmitting}>
                    <ContactImage pictureUri={imageUri} />
                  </TouchableOpacity>

                  <Text>Name</Text>
                  <TextInput
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    defaultValue={initialValues.name}
                    // placeholder={}
                    // style={}
                  />
                  {errors.name && (
                    <Text style={style.error}>{errors.name}</Text>
                  )}

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

                  <TouchableOpacity
                    onPress={() => handleSubmit()}
                    disabled={!isValid || isSubmitting}>
                    <Text>Submit</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </View>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  error: {fontSize: 10, color: 'red'},
});
