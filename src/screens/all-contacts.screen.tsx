import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Button, FlatList, Text, View} from 'react-native';
import {RootStackParamList} from '../interfaces';
import axios from 'axios';
import reactotron from 'reactotron-react-native';
import ContactDetailsButton from '../components/CustomButton.component';
// import Loader from '../components/loader.component';

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
        reactotron.log('hola');
        // const response = await axios.get('http://192.168.89.30:3000/contacts');
        const response = await axios.get('http://192.168.0.244:3000/contacts');
        reactotron.log('response.data: ', response.data);
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

  type AddcontactScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'AddContact'
  >;

  const navigationToCreateContact =
    useNavigation<AddcontactScreenNavigationProp>();

  return (
    <View>
      {isLoading ? (
        // <Loader name={'2-curves'} /> //TODO: Make this loader work!
        <Text>Loading...</Text>
      ) : (
        <View>
          <FlatList
            data={contacts}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <ContactDetailsButton name={item.name} picture={item.picture} />
            )}
          />
        </View>
      )}
      <Button
        title="Add contact"
        onPress={() => navigationToCreateContact.navigate('AddContact')}
      />
    </View>
  );
}
