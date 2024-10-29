import React from 'react';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import {theme} from '../../theme/main.theme';

interface IConfirmationModal {
  children: React.ReactNode;
  confirmationModalVisible: boolean;
  setConfirmationModalVisible: (confirmationModalVisible: boolean) => void;
  handleAccept: () => void;
  requiresCancel: boolean;
}

export const ConfirmationModal = ({
  children,
  confirmationModalVisible,
  setConfirmationModalVisible,
  handleAccept,
  requiresCancel,
}: IConfirmationModal): React.JSX.Element => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={confirmationModalVisible}
      onRequestClose={() =>
        setConfirmationModalVisible(!confirmationModalVisible)
      }>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{children}</Text>
          <TouchableOpacity
            style={[styles.button, styles.acceptButton]}
            onPress={handleAccept}>
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
          {requiresCancel && (
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() =>
                setConfirmationModalVisible(!confirmationModalVisible)
              }>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: theme.colors.background,
    borderRadius: theme.spacing.small,
    padding: theme.spacing.large,
    alignItems: 'center',
    shadowColor: theme.colors.textPrimary,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: theme.spacing.small,
    padding: theme.spacing.medium,
    elevation: 2,
  },
  acceptButton: {
    backgroundColor: theme.colors.accent,
    marginTop: theme.spacing.small,
  },
  cancelButton: {
    backgroundColor: theme.colors.buttonBackground,
    marginTop: theme.spacing.small,
  },
  buttonText: {
    color: theme.colors.textPrimary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.text,
    textAlign: 'center',
  },
});
