import React, {useState} from 'react';
import {StyleSheet, useColorScheme, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ContactImage({
  pictureUri,
}: {
  pictureUri?: string | undefined;
}) {
  const [imageError, setImageError] = useState<boolean>(false);
  const isDarkMode = useColorScheme() === 'dark'; // TODO: Maybe define this in the main app theme?
  return (
    <View>
      {imageError || !pictureUri ? (
        <Icon
          name="person-circle"
          size={100}
          color={!isDarkMode ? 'grey' : 'white'}
        />
      ) : (
        <FastImage
          style={style.imageDimensions}
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

const style = StyleSheet.create({
  imageDimensions: {
    width: 200,
    height: 200,
  },
});
