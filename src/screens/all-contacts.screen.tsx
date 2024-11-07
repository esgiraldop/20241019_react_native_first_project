import React, {useCallback, useState} from 'react';
import {FlatList, Text, View, StyleSheet} from 'react-native';
import {SmallButton} from '../components/common/SmallButton';
import {GoToContacDetailsButton} from '../components/allContacts';
import {ButtonsCarrousel} from '../components/common/ButtonsCarrousel.component';
import {ContactsService} from '../services/contacts.service';
import {IContact} from '../interfaces/contact.interface';
import {useFocusEffect} from '@react-navigation/native';
import {theme} from '../theme/main.theme';
import {PermissionEnum} from '../interfaces/permissions.interface';
import {checkPermission} from '../utilities/check-permissions.utility';
import {NotifyUserPermissionModal} from '../components/common/notifyUserPermissionModal.component';

export function AllContactsScreen(): React.JSX.Element {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorLoading, setErrorLoading] = useState<boolean | null>(null);
  const [permissionModalOpen, setPermissionModalopen] =
    useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      async function fetchAllContacts() {
        setIsLoading(true);

        const contactsPermissionResponse = await checkPermission(
          PermissionEnum.READ_CONTACTS,
        );
        const cellphonesPermissionResponse = await checkPermission(
          PermissionEnum.READ_PHONE_NUMBERS,
        );

        if (contactsPermissionResponse && cellphonesPermissionResponse) {
          const response = await ContactsService.getAll();
          if (response) {
            setContacts(response);
            setIsLoading(false);
            setErrorLoading(false);
          } else {
            setIsLoading(false);
            setErrorLoading(true);
          }
        } else {
          setIsLoading(false);
          setErrorLoading(true);
          setPermissionModalopen(true);
        }
      }

      fetchAllContacts();

      return () => fetchAllContacts();
    }, []),
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : errorLoading ? (
        <Text style={styles.loadingText}>Error loading contacts</Text>
      ) : (
        <FlatList
          ListHeaderComponent={
            <ButtonsCarrousel>
              <SmallButton text={'Add new contact'} />
              <SmallButton text={'Search a contact'} />
            </ButtonsCarrousel>
          }
          data={contacts.sort((a, b) => a.name.localeCompare(b.name))}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <GoToContacDetailsButton
              name={item.name}
              id={item.id}
              picture={item.picture}
            />
          )}
        />
      )}
      {permissionModalOpen && (
        <NotifyUserPermissionModal
          modalOpen={permissionModalOpen}
          setModalopen={setPermissionModalopen}
          message={
            'Please enable the app permissions from the settings to be able to use this feature'
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingText: {
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.large,
  },
});
