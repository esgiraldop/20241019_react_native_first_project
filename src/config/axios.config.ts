import axios, {AxiosInstance} from 'axios';

// export const baseURL = 'http://192.168.89.51:3000';
// export const baseURL = 'http://192.168.0.244:3000'; // --> Danubio
// export const baseURL = 'http://192.168.0.101:3000'; // --> Mari
export const baseURL = 'http://192.168.89.144:3000'; // --> Riwi
export const weatherBaseURL = 'https://api.openweathermap.org/data/2.5/weather';

const WEATHER_API_KEY = '3856a833ab41d919ab1ac5bcd4a63399';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

export const weatherAxiosInstance: AxiosInstance = axios.create({
  baseURL: weatherBaseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    appid: WEATHER_API_KEY,
    lang: 'en',
    units: 'metric',
  },
});
