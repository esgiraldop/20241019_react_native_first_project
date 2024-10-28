import React from 'react';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ContactImage from './contactImage.component';

interface IAddPictureModal {
  addPictureModalVisible: boolean;
  setAddPictureModalVisible: (addPictureModalVisible: boolean) => void;
  setImageUri: (imageUri: string) => void;
  pictureUri?: string | undefined;
}

export const AddPictureModal = ({
  addPictureModalVisible,
  setAddPictureModalVisible,
  setImageUri,
  pictureUri = undefined,
}: IAddPictureModal): React.JSX.Element => {
  const openCamera = async () => {
    const response = await launchCamera({
      mediaType: 'photo',
      cameraType: 'front',
    });
    if (response.assets && response.assets.length > 0) {
      setImageUri(response.assets[0].uri || '');
    }
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={addPictureModalVisible}
        onRequestClose={() => {
          setAddPictureModalVisible(!addPictureModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ContactImage pictureUri={pictureUri} />
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={openCamera}>
              <Text>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => console.log('Gallery opened')}>
              <Text>Select from gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setAddPictureModalVisible(!addPictureModalVisible);
              }}>
              <Text>Cancel</Text>
            </TouchableOpacity>
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
