import {StyleSheet} from 'react-native';
import {theme} from '../theme/main.theme';

export const formStyles = StyleSheet.create({
  VerticallyCenteredcontainer: {
    justifyContent: 'center',
  },
  formContainer: {
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: theme.spacing.large,
  },
  error: {
    fontSize: 12,
    color: 'red',
    marginBottom: theme.spacing.small,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
