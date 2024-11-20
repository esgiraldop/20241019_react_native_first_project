import {StyleSheet} from 'react-native';
import {theme} from '../theme/main.theme';
import {ScreenHeight, ScreenWidth} from 'react-native-elements/dist/helpers';

export const containerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing.small,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
  },
  buttonsContainerLight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing.small,
    backgroundColor: theme.colors.backgroundLight,
    alignItems: 'center',
  },
  container3: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    width: ScreenWidth,
    height: ScreenHeight / 3, // Set height to 1/3 of screen height
    marginBottom: 10,
  },
  buttonContainer: {
    flex: 1, // Ensures adaptability in flex containers
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: theme.spacing.small,
    marginTop: theme.spacing.medium, // Default spacing
  },
  card: {
    backgroundColor: theme.colors.backgroundLight,
    padding: theme.spacing.large,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: theme.colors.borderColor,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  marginSmall: {
    margin: theme.spacing.small,
  },
  marginMedium: {
    margin: theme.spacing.medium,
  },
});
