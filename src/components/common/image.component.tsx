import React, {useState} from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import FastImage from 'react-native-fast-image';
var contactPhotoLight = require('../../assets/img/contact-photo-light.png');
var contactPhotoDark = require('../../assets/img/contact-photo-dark.png');

export default function ContactImage() {
  const [imageError, setImageError] = useState<boolean>(false);
  const isDarkMode = useColorScheme() === 'dark'; // TODO: Maybe define this in the main app theme?
  return (
    <FastImage
      style={style.imageDimensions}
      source={
        imageError
          ? !isDarkMode
            ? contactPhotoLight
            : contactPhotoDark
          : {
              uri: 'https:....png',
              priority: FastImage.priority.normal,
            }
      }
      resizeMode={FastImage.resizeMode.contain}
      onError={() => setImageError(true)}
    />
  );
}

const style = StyleSheet.create({
  imageDimensions: {
    width: 200,
    height: 200,
  },
});
