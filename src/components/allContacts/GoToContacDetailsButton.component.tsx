import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {RootStackParamList} from '../../interfaces';
import {useNavigation} from '@react-navigation/native';
import {IContact} from '../../screens';
import {Text} from 'react-native-elements';
// import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';

interface IContactDetailsButton extends Pick<IContact, 'name' | 'picture'> {}

export function GoToContacDetailsButton({
  name,
  picture,
}: IContactDetailsButton) {
  type ContactDetailsScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'ContactDetails'
  >;

  const [imageError, setImageError] = useState<boolean>(false);

  const navigationToContactDetailsScreen =
    useNavigation<ContactDetailsScreenNavigationProp>();
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigationToContactDetailsScreen.navigate('ContactDetails')
        }>
        <FastImage
          style={{width: 200, height: 200}}
          source={
            imageError
              ? require('../../assets/img/contact-photo-white.png')
              : {
                  uri: 'https:....png',
                  priority: FastImage.priority.normal,
                }
          }
          resizeMode={FastImage.resizeMode.contain}
          onError={() => setImageError(true)}
        />
        <Text>{picture}</Text>
        <Text>{name}</Text>
        {/* <Icon size={24} color="grey" name="person-circle-outline" /> //TODO: Make these icons work */}
      </TouchableOpacity>
    </View>
  );
}
