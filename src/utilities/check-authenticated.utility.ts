import {getAsyncStorageValue} from './get-async-storage-contents.utility';

export const checkUserAuthenticated = async (): Promise<boolean> => {
  return !!getAsyncStorageValue('token');
};
