import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import axios from 'axios';
import reactotron from 'reactotron-react-native';
import {SmallButton} from '../components/common/SmallButton';
import {GoToContacDetailsButton} from '../components/allContacts/';
import {ButtonsCarrousel} from '../components/common/ButtonsCarrousel.component';
// import Loader from '../components/loader.component';
import Icon from 'react-native-vector-icons/Ionicons';

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
      try {
        const response = await axios.get('http://192.168.89.51:3000/contacts');
        // const response = await axios.get('http://192.168.0.244:3000/contacts');
        if (!String(response.status).startsWith('2')) {
          const errorMessage =
            (response.data as {error?: string})?.error || 'Unknown error';
          throw new Error(`There was an error: ${errorMessage}`);
        }
        setContacts(response.data);
        setIsLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Network or Axios error:', error.message);
        } else {
          console.error('An unexpected error occurred:', error);
        }
      }
    }
    fetchAllContacts();
  }, []);

  return (
    <View>
      <Icon size={24} color="grey" name="add-outline" />
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
              <GoToContacDetailsButton name={item.name} />
            )}
          />
        </View>
      )}
    </View>
  );
}
