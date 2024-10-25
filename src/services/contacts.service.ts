import {axiosInstance} from '../config/axios.config';
import {IContact, IUpdateContact} from '../interfaces/contact.interface';
import {handleAxiosResponse} from '../utilities/handle-axios-response.utility';

export class ContactsService {
  static resource = 'contacts';

  static async getAll(): Promise<IContact[]> {
    return handleAxiosResponse<IContact[]>(
      async () => await axiosInstance.get<IContact[]>(`${this.resource}`),
    );
  }

  static async getById(id: number): Promise<IContact> {
    return handleAxiosResponse<IContact>(
      async () => await axiosInstance.get<IContact>(`${this.resource}/${id}`),
    );
  }

  static async create(contactData: IUpdateContact): Promise<IContact> {
    return handleAxiosResponse<IContact>(
      async () =>
        await axiosInstance.post<IContact>(`${this.resource}`, contactData),
    );
  }

  static async update(
    id: number,
    contactData: IUpdateContact,
  ): Promise<IContact> {
    return handleAxiosResponse<IContact>(
      async () =>
        await axiosInstance.patch<IContact>(
          `${this.resource}/${id}`,
          contactData,
        ),
    );
  }

  static async delete(id: number): Promise<IContact> {
    return handleAxiosResponse<IContact>(
      async () =>
        await axiosInstance.delete<IContact>(`${this.resource}/${id}`),
    );
  }
}
