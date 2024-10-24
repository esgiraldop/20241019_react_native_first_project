import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {SmallButton} from '../components/common/SmallButton';
import {GoToContacDetailsButton} from '../components/allContacts/';
import {ButtonsCarrousel} from '../components/common/ButtonsCarrousel.component';
// import Loader from '../components/loader.component';
import {ContactsService} from '../services/contacts.service';

export interface IContact {
  id: string;
  name: string;
  phoneNumber: number;
  email: string;
  picture: string;
}

export function AllContactsScreen(): React.JSX.Element {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchAllContacts() {
      setIsLoading(true);
      const response = await ContactsService.getAll();
      if (response) {
        setContacts(response);
        setIsLoading(false);
      }
    }
    fetchAllContacts();
  }, []);

  return (
    <View>
      {isLoading ? (
        // <Loader name={'2-curves'} /> //TODO: Make this loader work!
        <Text>Loading...</Text>
      ) : (
        <View>
          <FlatList
            ListHeaderComponent={
              <ButtonsCarrousel>
                <SmallButton text={'Add new contact'} />
                <SmallButton text={'Search a contact'} />
              </ButtonsCarrousel>
            }
            data={contacts}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <GoToContacDetailsButton name={item.name} id={item.id} />
            )}
          />
        </View>
      )}
    </View>
  );
}
