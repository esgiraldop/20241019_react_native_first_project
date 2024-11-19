import {StyleSheet} from 'react-native';
import {theme} from '../theme/main.theme';

export const buttonStyle = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.buttonBackground,
    padding: theme.spacing.medium,
    marginTop: theme.spacing.medium,
    borderRadius: theme.spacing.small,
    alignItems: 'center',
  },
  button2: {
    backgroundColor: theme.colors.accent,
    paddingVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.large,
    borderRadius: theme.spacing.small,
    width: '100%',
    alignItems: 'center',
    marginVertical: theme.spacing.small,
  },
  button3: {
    borderRadius: theme.spacing.small,
    padding: theme.spacing.medium,
    elevation: 2,
  },
  button4: {
    backgroundColor: theme.colors.accent,
    padding: theme.spacing.medium,
    borderRadius: 8,
  },
  saveButton: {
    flex: 1,
    backgroundColor: theme.colors.accent,
    padding: theme.spacing.medium,
    borderRadius: theme.spacing.small,
    alignItems: 'center',
    marginLeft: theme.spacing.small,
  },
  touchableButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderColor,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: theme.colors.buttonBackground,
    padding: theme.spacing.medium,
    borderRadius: theme.spacing.small,
    alignItems: 'center',
    marginRight: theme.spacing.small,
  },
  cancelButton2: {
    backgroundColor: theme.colors.buttonBackground,
    paddingVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.large,
    borderRadius: theme.spacing.small,
    width: '100%',
    alignItems: 'center',
    marginVertical: theme.spacing.small,
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
  },
  cancelButton3: {
    backgroundColor: theme.colors.buttonBackground,
    marginTop: theme.spacing.small,
  },
  buttonWrapper: {
    flex: 1,
    margin: theme.spacing.small,
  },
  acceptButton: {
    backgroundColor: theme.colors.accent,
    marginTop: theme.spacing.small,
  },
});
