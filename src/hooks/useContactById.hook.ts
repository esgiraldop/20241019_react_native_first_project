import {useCallback, useState} from 'react';
import {ISingleContactSucessfullResponse} from '../interfaces/contact.interface';
import {ContactsService} from '../services/contacts.service';
import {useFocusEffect} from '@react-navigation/native';

export function useContactById(contactId: number) {
  const [contactInfo, setContactInfo] =
    useState<ISingleContactSucessfullResponse | null>(null);
  const [isContactLoading, setIsContactLoading] = useState<boolean | null>(
    false,
  );
  const [errorLoadingContact, setErrorLoadingContact] = useState<
    boolean | null
  >(null);

  useFocusEffect(
    useCallback(() => {
      async function getContactInfo(id: number) {
        setIsContactLoading(true);
        const contactInfoResponse = await ContactsService.getById(id);
        if (contactInfoResponse) {
          setContactInfo(contactInfoResponse);
          setIsContactLoading(false);
          setErrorLoadingContact(false);
        } else {
          setIsContactLoading(false);
          setErrorLoadingContact(true);
        }
      }

      getContactInfo(contactId);
      return () => getContactInfo(contactId);
    }, [contactId]),
  );

  return {
    contactInfo,
    setContactInfo,
    isContactLoading,
    setIsContactLoading,
    errorLoadingContact,
    setErrorLoadingContact,
  };
}
