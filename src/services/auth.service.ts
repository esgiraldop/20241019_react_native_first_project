import {axiosInstance} from '../config/axios.config';
import {IUser} from '../interfaces/user.interface';
import {handleAxiosResponse} from '../utilities/handle-axios-response.utility';

export class AuthService {
  static resource = 'auth';

  static async register(values: IUser): // handleError?: IHandleError
  Promise<IUser | null> {
    return handleAxiosResponse<IUser>(
      async () =>
        await axiosInstance.post<IUser>(`${this.resource}/register`, values),
    );
  }
}
