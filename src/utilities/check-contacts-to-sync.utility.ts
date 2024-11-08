import {Contact} from 'react-native-contacts/type';
import {IContact} from '../interfaces/contact.interface';
import {phoneContactsAdapter} from '../adapters/phoneContacts.adapter';

export const getContactsToSync = (
  appContacts: IContact[],
  phoneContacts: Contact[],
): Contact[] => {
  const appContactsNames = appContacts.map(
    (appContact: IContact): string => appContact.name,
  );
  const newContacts = phoneContacts.filter(
    (phoneContact: Contact): Boolean =>
      !appContactsNames.includes(phoneContact.displayName),
  );

  return newContacts;
};

export const syncContacts = (
  appContacts: IContact[],
  phoneContacts2Sync: Contact[],
) => {
  //Getting last id from the app's contacts
  const contactsIds = appContacts.map(appContact => +appContact.id);
  const maxId = contactsIds.reduce((a, b) => (a > b ? a : b));

  // Transforming phone contacts' to app contacts'
  const phoneContacts2SyncAdapted = phoneContactsAdapter(
    phoneContacts2Sync,
    maxId + 1,
  );

  // Returning all contacts
  return [...appContacts, ...phoneContacts2SyncAdapted];
};
