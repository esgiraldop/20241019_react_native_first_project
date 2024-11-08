import {axiosInstance} from '../config/axios.config';
import {IContact, IUpdateContact} from '../interfaces/contact.interface';
import {handleAxiosResponse} from '../utilities/handle-axios-response.utility';
import Contacts from 'react-native-contacts';
import {Contact} from 'react-native-contacts/type';
import {showSnackbar} from '../utilities/snackbar.utility';

export type IHandleError = (
  isErrorModalOpen: boolean,
  errorLoading: boolean,
) => void;

export class ContactsService {
  static resource = 'contacts';

  static async getAll(): // handleError?: IHandleError
  Promise<IContact[] | null> {
    return handleAxiosResponse<IContact[]>(
      async () => await axiosInstance.get<IContact[]>(`${this.resource}`),
      // handleError,
    );
  }

  static async getById(
    id: number,
    // handleError?: IHandleError,
  ): Promise<IContact | null> {
    return handleAxiosResponse<IContact>(
      async () => await axiosInstance.get<IContact>(`${this.resource}/${id}`),
      // handleError,
    );
  }

  static async create(
    contactData: IUpdateContact,
    // handleError?: IHandleError,
  ): Promise<IContact | null> {
    return handleAxiosResponse<IContact>(
      async () =>
        await axiosInstance.post<IContact>(`${this.resource}`, contactData),
      // handleError,
    );
  }

  static async update(
    id: number,
    contactData: IUpdateContact,
    // handleError?: IHandleError,
  ): Promise<IContact | null> {
    return handleAxiosResponse<IContact>(
      async () =>
        await axiosInstance.patch<IContact>(
          `${this.resource}/${id}`,
          contactData,
        ),
      // handleError,
    );
  }

  static async delete(
    id: number,
    // handleError?: IHandleError,
  ): Promise<IContact | null> {
    return handleAxiosResponse<IContact>(
      async () =>
        await axiosInstance.delete<IContact>(`${this.resource}/${id}`),
      // handleError,
    );
  }

  static async sync(): Promise<Contact[] | null> {
    //Checking permissions first

    try {
      return await Contacts.getAll();
    } catch (error) {
      let errorMessage =
        'There was a problem getting the contacts from the cellphone';
      errorMessage += error instanceof Error ? error.message : '';
      showSnackbar(errorMessage);
      return Promise.resolve(null);
    }
  }
}
