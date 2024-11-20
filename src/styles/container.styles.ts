import {StyleSheet} from 'react-native';
import {theme} from '../theme/main.theme';
import {ScreenHeight, ScreenWidth} from 'react-native-elements/dist/helpers';

export const containerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
  },
  complexButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing.small,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
  },
  complexButtonContainerLight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing.small,
    backgroundColor: theme.colors.backgroundLight,
    alignItems: 'center',
  },
  complexButtonContainerRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: theme.spacing.small,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
  },
  container3: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    width: ScreenWidth,
    height: ScreenHeight / 3,
    marginBottom: 10,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: theme.spacing.small,
    marginTop: theme.spacing.medium,
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
