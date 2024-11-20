import React, {useState} from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import {imageStyles} from '../../styles/image.styles';
import {containerStyles} from '../../styles/container.styles';
import {theme} from '../../theme/main.theme';

interface IContactImage {
  pictureUri?: string | undefined;
  size?: number | undefined;
}

export default function ContactImage({
  pictureUri,
  size = undefined,
}: IContactImage) {
  const [imageError, setImageError] = useState<boolean>(false);
  // const isDarkMode = useColorScheme() === 'dark'; // TODO: To use this in the future for light and dark versions
  return (
    <View style={containerStyles.complexButtonContainer}>
      {imageError || !pictureUri ? (
        <Icon
          name="person-circle"
          size={size ? size : imageStyles.image.width}
          color={theme.colors.textPrimary}
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
