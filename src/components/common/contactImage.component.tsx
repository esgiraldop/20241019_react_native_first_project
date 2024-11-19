import React, {useState} from 'react';
import {useColorScheme, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import {formStyles} from '../../styles/form.styles';
import {imageStyles} from '../../styles/image.styles';

interface IContactImage {
  pictureUri?: string | undefined;
  size?: number | undefined;
}

export default function ContactImage({
  pictureUri,
  size = undefined,
}: IContactImage) {
  const [imageError, setImageError] = useState<boolean>(false);
  const isDarkMode = useColorScheme() === 'dark'; // TODO: Maybe define this in the main app theme?
  return (
    <View style={formStyles.container}>
      {imageError || !pictureUri ? (
        <Icon
          name="person-circle"
          size={size ? size : imageStyles.image.width}
          color={!isDarkMode ? 'grey' : 'white'}
        />
      ) : (
        <FastImage
          style={{
            ...imageStyles.image,
            width: size ? size : imageStyles.image.width,
            height: size ? size : imageStyles.image.height,
            borderRadius: size ? size : imageStyles.image.borderRadius,
          }}
          source={{
            uri: pictureUri,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
          onError={() => setImageError(true)}
        />
      )}
    </View>
  );
}
