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
    <View style={styles.container}>
      {imageError || !pictureUri ? (
        <Icon
          name="person-circle"
          size={styles.image.width}
          color={!isDarkMode ? 'grey' : 'white'}
        />
      ) : (
        <FastImage
          style={styles.image}
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

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: '#ccc', // Optional border
    borderWidth: 1, // Optional border
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0', // Optional background color for icon
    justifyContent: 'center',
    alignItems: 'center',
  },
});
