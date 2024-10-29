import React from 'react';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ContactImage from './contactImage.component';
import {theme} from '../../theme/main.theme';

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
    setAddPictureModalVisible(!addPictureModalVisible);
  };

  const openGallery = async () => {
    const response = await launchImageLibrary({
      mediaType: 'photo',
    });
    if (response.assets && response.assets.length > 0) {
      setImageUri(response.assets[0].uri || '');
    }
    setAddPictureModalVisible(!addPictureModalVisible);
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

            <TouchableOpacity style={styles.button} onPress={openCamera}>
              <Text style={styles.buttonText}>Open Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={openGallery}>
              <Text style={styles.buttonText}>Select from Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() =>
                setAddPictureModalVisible(!addPictureModalVisible)
              }>
              <Text style={styles.cancelButtonText}>Cancel</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for the modal overlay
  },
  modalView: {
    backgroundColor: theme.colors.buttonBackground,
    borderRadius: theme.spacing.small,
    padding: theme.spacing.large,
    alignItems: 'center',
    shadowColor: theme.colors.borderColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%', // Centering the modal width
  },
  button: {
    backgroundColor: theme.colors.accent,
    paddingVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.large,
    borderRadius: theme.spacing.small,
    width: '100%',
    alignItems: 'center',
    marginVertical: theme.spacing.small,
  },
  buttonText: {
    color: theme.colors.textPrimary,
    fontWeight: 'bold',
    fontSize: theme.fontSizes.text,
  },
  cancelButton: {
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
  cancelButtonText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.text,
  },
});
