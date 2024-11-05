import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  PermissionStatus,
} from 'react-native-permissions';
import {
  PermissionEnum,
  permissionMap,
} from '../interfaces/permissions.interface';

export const checkPermission = async (
  permissionKey: PermissionEnum,
): Promise<boolean> => {
  const permission = permissionMap[permissionKey]; // Use PERMISSIONS.IOS.CAMERA for iOS

  const result: PermissionStatus = await check(permission);
  switch (result) {
    case RESULTS.UNAVAILABLE:
      console.log(`${permissionKey} is not available on this device`);
      return false;
    case RESULTS.DENIED:
      console.log(`${permissionKey} permission is denied but requestable`);
      const response = await requestPermission(permissionKey); // Request permission if it's denied
      return !response ? false : true;
    case RESULTS.LIMITED:
      console.log(`${permissionKey} permission is limited`);
      return true;
    case RESULTS.GRANTED:
      console.log(`${permissionKey} permission is granted`);
      return true;
    case RESULTS.BLOCKED:
      console.log(
        `${permissionKey} permission is blocked and cannot be requested`,
      );
      // Inform the user they need to enable permissions in settings
      return false;
  }
};

const requestPermission = async (
  permissionKey: PermissionEnum,
): Promise<boolean | void> => {
  try {
    const result: PermissionStatus = await request(PERMISSIONS.ANDROID.CAMERA);
    if (result === RESULTS.GRANTED) {
      console.log(`${permissionKey} permission granted`);
      return true;
    } else {
      console.log(`${permissionKey} permission not granted`);
      return false;
    }
  } catch (error) {
    throw new Error(`Error requesting ${permissionKey} permission:, ${error}`);
  }
};
