import React, {useCallback, useState} from 'react';
import {FlatList, Text, View, StyleSheet} from 'react-native';
import {SmallButton} from '../components/common/SmallButton';
import {GoToContacDetailsButton} from '../components/allContacts';
import {ButtonsCarrousel} from '../components/common/ButtonsCarrousel.component';
import {ContactsService} from '../services/contacts.service';
import {IContact} from '../interfaces/contact.interface';
import {useFocusEffect} from '@react-navigation/native';
import {theme} from '../theme/main.theme';

export function AllContactsScreen(): React.JSX.Element {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useFocusEffect(
    useCallback(() => {
      async function fetchAllContacts() {
        setIsLoading(true);
        const response = await ContactsService.getAll();
        if (response) {
          setContacts(response);
          setIsLoading(false);
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
