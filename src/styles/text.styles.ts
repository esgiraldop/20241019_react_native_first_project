import {StyleSheet} from 'react-native';
import {theme} from '../theme/main.theme';

export const textStyles = StyleSheet.create({
  loadingText: {
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  errorText: {
    color: theme.colors.error,
    textAlign: 'center',
  },
  sucessText: {
    color: theme.colors.success,
    textAlign: 'center',
  },
  label: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.small,
    marginBottom: theme.spacing.small,
  },
  input: {
    backgroundColor: theme.colors.backgroundLight,
    color: theme.colors.textPrimary,
    padding: theme.spacing.small,
    borderRadius: theme.spacing.small,
    width: '100%',
    marginBottom: theme.spacing.medium,
  },
  buttonText: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.small,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonSmallText: {
    color: theme.colors.textPrimary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonText3: {
    color: theme.colors.textPrimary,
    textAlign: 'center',
    fontSize: theme.fontSizes.small,
  },
  linkText: {
    color: theme.colors.textPrimary,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  titleText: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.title,
    marginBottom: theme.spacing.huge,
    fontWeight: 'bold',
  },
  textAlignmentLeft: {
    textAlign: 'left',
  },
  nameText: {
    fontSize: theme.fontSizes.title,
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.small,
  },
  nameTextTouchableButton: {
    color: theme.colors.textPrimary,
    marginLeft: theme.spacing.medium,
    fontSize: theme.fontSizes.small,
  },
  phoneText: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.textSecondary,
    marginVertical: theme.spacing.small,
  },
  emailText: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.textSecondary,
  },
  cancelButtonText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.small,
  },
  bigText: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.small,
  },
  modalText: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.small,
    textAlign: 'center',
  },
});
