import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {RootStackParamList} from '../../interfaces';
import {useNavigation} from '@react-navigation/native';
import {Text} from 'react-native-elements';
import ContactImage from '../common/contactImage.component';
import {IContact} from '../../interfaces/contact.interface';
import {textStyles} from '../../styles/text.styles';
import {formStyles} from '../../styles/form.styles';

interface IContactDetailsButton
  extends Pick<IContact, 'name' | 'id' | 'imageUri'> {}

export function GoToContacDetailsButton({
  name,
  id,
  imageUri,
}: IContactDetailsButton) {
  type ContactDetailsScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'ContactDetails'
  >;

  const navigation = useNavigation<ContactDetailsScreenNavigationProp>();

  return (
    <TouchableOpacity
      style={formStyles.container}
      onPress={() => navigation.navigate('ContactDetails', {contactId: id})}>
      <ContactImage pictureUri={imageUri} />
      <Text style={textStyles.nameTextTouchableButton}>{name}</Text>
    </TouchableOpacity>
  );
}
