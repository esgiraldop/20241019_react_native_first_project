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
): Promise<void> => {
  const permission = permissionMap[permissionKey]; // Use PERMISSIONS.IOS.CAMERA for iOS

  const result: PermissionStatus = await check(permission);
  switch (result) {
    case RESULTS.UNAVAILABLE:
      console.log(`${permissionKey} is not available on this device`);
      break;
    case RESULTS.DENIED:
      console.log(`${permissionKey} permission is denied but requestable`);
      requestPermission(permissionKey); // Request permission if it's denied
      break;
    case RESULTS.LIMITED:
      console.log(`${permissionKey} permission is limited`);
      break;
    case RESULTS.GRANTED:
      console.log(`${permissionKey} permission is granted`);
      break;
    case RESULTS.BLOCKED:
      console.log(
        `${permissionKey} permission is blocked and cannot be requested`,
      );
      // Inform the user they need to enable permissions in settings
      break;
  }
};

const requestPermission = async (
  permissionKey: PermissionEnum,
): Promise<void> => {
  try {
    const result: PermissionStatus = await request(PERMISSIONS.ANDROID.CAMERA);
    if (result === RESULTS.GRANTED) {
      console.log(`${permissionKey} permission granted`);
    } else {
      console.log(`${permissionKey} permission not granted`);
    }
  } catch (error) {
    console.error(`Error requesting ${permissionKey} permission:`, error);
  }
};
