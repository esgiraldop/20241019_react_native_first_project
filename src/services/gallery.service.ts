import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import Snackbar from 'react-native-snackbar';

export class ImagePickerService {
  static async pickImageFromGallery(
    imageSize: number,
  ): Promise<ImageOrVideo | null> {
    try {
      return await ImagePicker.openPicker({
        width: imageSize,
        height: imageSize,
        cropping: true,
      });
    } catch (error) {
      let errorMessage = 'The picture could not be loaded from the gallery';
      errorMessage += error instanceof Error ? error.message : '';
      Snackbar.show({
        text: errorMessage,
        // textColor: 'black',
        // backgroundColor: 'black',
        duration: Snackbar.LENGTH_INDEFINITE,
        numberOfLines: 5,
        marginBottom: 10,
        action: {
          text: 'Accept',
          textColor: 'red',
          // onPress: {handleError},
        },
      });
      return Promise.resolve(null);
    }
  }

  static async pickImageFromCamera(imageSize: number) {
    try {
      return await ImagePicker.openCamera({
        width: imageSize,
        height: imageSize,
        cropping: true,
      });
    } catch (error) {
      let errorMessage = 'The picture could not be loaded from the camera';
      errorMessage += error instanceof Error ? error.message : '';
      Snackbar.show({
        text: errorMessage,
        // textColor: 'black',
        // backgroundColor: 'black',
        duration: Snackbar.LENGTH_INDEFINITE,
        numberOfLines: 5,
        marginBottom: 10,
        action: {
          text: 'Accept',
          textColor: 'red',
          // onPress: {handleError},
        },
      });
      return Promise.resolve(null);
    }
  }
}
