import {StyleSheet} from 'react-native';
import {theme} from '../theme/main.theme';

export const containerStyles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.buttonBackground,
    padding: theme.spacing.large,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: theme.colors.borderColor,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
});
