import {StyleSheet} from 'react-native';
import {theme} from '../theme/main.theme';

export const imageStyles = StyleSheet.create({
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
  icon2: {
    width: 50,
    height: 50,
    marginBottom: theme.spacing.medium,
  },
});
