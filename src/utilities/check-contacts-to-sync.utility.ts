import {Contact} from 'react-native-contacts/type';
import {IContact} from '../interfaces/contact.interface';
import {phoneContactsAdapter} from '../adapters/phoneContacts.adapter';
import {ContactsService} from '../services/contacts.service';

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

export const syncContacts = async (
  phoneContacts2Sync: Contact[],
): Promise<IContact[] | null> => {
  //Getting last id from the app's contacts
  // const contactsIds = appContacts.map(appContact => +appContact.id);
  // const maxId = contactsIds.reduce((a, b) => (a > b ? a : b));

  // Transforming phone contacts' to app contacts'
  const phoneContacts2SyncAdapted = phoneContactsAdapter(
    phoneContacts2Sync,
    // maxId + 1,
  );
  // Returning all contacts
  return await ContactsService.createMultiple(phoneContacts2SyncAdapted);
};
