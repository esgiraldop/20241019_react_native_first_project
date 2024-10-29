import {useCallback, useEffect, useState} from 'react';
import {IContact} from '../interfaces/contact.interface';
import {ContactsService} from '../services/contacts.service';
import {useFocusEffect} from '@react-navigation/native';

export function useContactById(contactId: number) {
  const [contactInfo, setContactInfo] = useState<IContact | null>(null);
  const [isContactLoading, setIsContactLoading] = useState<boolean | null>(
    false,
  );
  const [errorLoadingContact, setErrorLoadingContact] =
    useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      async function getContactInfo(id: number) {
        const contactInfoResponse = await ContactsService.getById(id);
        setIsContactLoading(true);
        if (contactInfoResponse) {
          setContactInfo(contactInfoResponse);
          setIsContactLoading(false);
        }
      }

      getContactInfo(contactId);
      return () => getContactInfo(contactId);
    }, [contactId]),
  );

  useEffect(() => {
    if (!contactInfo) {
      setErrorLoadingContact(true);
    } else {
      setErrorLoadingContact(false);
    }

    setIsContactLoading(false);
  }, [contactInfo, setIsContactLoading]);

  return {
    contactInfo,
    setContactInfo,
    isContactLoading,
    setIsContactLoading,
    errorLoadingContact,
    setErrorLoadingContact,
  };
}
