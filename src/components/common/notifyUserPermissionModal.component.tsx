import React from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import {modalStyles} from './addPictureModal.component';

interface INotifyUserPermissionModal {
  modalOpen: boolean;
  setModalopen: (modalOpen: boolean) => void;
}

export const NotifyUserPermissionModal = ({
  modalOpen,
  setModalopen,
}: INotifyUserPermissionModal) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOpen}
        onRequestClose={() => {
          setModalopen(!modalOpen);
        }}>
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Text style={modalStyles.bigText}>
              Please enable the app permissions from the settings to be able to
              use this feature
            </Text>

            <TouchableOpacity
              style={modalStyles.button}
              onPress={() => setModalopen(!modalOpen)}>
              <Text style={modalStyles.buttonText}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
