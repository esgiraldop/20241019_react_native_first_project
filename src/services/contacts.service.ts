import {axiosInstance} from '../config/axios.config';
import {IContact} from '../screens';
import {handleAxiosResponse} from '../utilities/handle-axios-response.utility';

export class ContactsService {
  static resource = 'contacts';

  static async getAll(): Promise<IContact[]> {
    return handleAxiosResponse<IContact[]>(
      async () => await axiosInstance.get<IContact[]>(`${this.resource}`),
    );
  }
}
