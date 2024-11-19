import {StyleSheet} from 'react-native';
import {theme} from '../theme/main.theme';
import {ScreenHeight, ScreenWidth} from 'react-native-elements/dist/helpers';

export const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing.small,
    backgroundColor: theme.colors.buttonBackground,
  },
  container3: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container4: {
    width: ScreenWidth,
    height: ScreenHeight / 3, // Set height to 1/3 of screen height
    marginBottom: 10,
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
