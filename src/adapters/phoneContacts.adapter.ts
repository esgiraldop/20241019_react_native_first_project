import {Contact} from 'react-native-contacts/type';
import {IContact} from '../interfaces/contact.interface';

export const phoneContactsAdapter = (
  phoneContacts: Contact[],
  initId: number = 0,
): IContact[] => {
  return phoneContacts.map((phoneContact, idx) => ({
    id: String(initId + idx),
    name: phoneContact.displayName,
    phoneNumber: +phoneContact.phoneNumbers[0].number,
    email: phoneContact.emailAddresses[0].email,
    picture: phoneContact.thumbnailPath,
    latitude: 0,
    longitude: 0,
  }));
};
