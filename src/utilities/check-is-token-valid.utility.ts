import {jwtDecode} from 'jwt-decode';
import {getAsyncStorageValue} from './get-async-storage-contents.utility';

export const isTokenValid = async (): Promise<boolean> => {
  try {
    const token = await getAsyncStorageValue('token'); // Retrieve token from AsyncStorage
    if (!token) {
      return false;
    }

    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken.exp && currentTime < decodedToken.exp) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};
