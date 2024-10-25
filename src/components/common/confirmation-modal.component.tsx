import React from 'react';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';

interface IConfirmationModal {
  children: React.ReactNode;
  confirmationModalVisible: boolean;
  setConfirmatioModalVisible: (confirmationModalVisible: boolean) => void;
  handleAccept: () => void;
  requiresCancel: boolean;
}

export const ConfirmationModal = ({
  children,
  confirmationModalVisible,
  setConfirmatioModalVisible,
  handleAccept,
  requiresCancel,
}: IConfirmationModal): React.JSX.Element => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={confirmationModalVisible}
        onRequestClose={() => {
          setConfirmatioModalVisible(!confirmationModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{children}</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={handleAccept}>
              <Text>Accept</Text>
            </TouchableOpacity>
            {requiresCancel && (
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setConfirmatioModalVisible(!confirmationModalVisible);
                }}>
                <Text>Cancel</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </View>
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
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
