import axios, {AxiosInstance} from 'axios';

// export const baseURL = 'http://192.168.89.51:3000';
// export const baseURL = 'http://192.168.0.244:3000';
// export const baseURL = 'http://192.168.0.101:3000';
export const baseURL = 'http://192.168.88.160:3000';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});
