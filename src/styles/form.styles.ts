import {StyleSheet} from 'react-native';
import {theme} from '../theme/main.theme';

export const formStyles = StyleSheet.create({
  contacDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.medium,
    marginBottom: theme.spacing.small,
    borderRadius: 8,
    backgroundColor: theme.colors.background,
    elevation: 3,
    shadowColor: theme.colors.textSecondary,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
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
