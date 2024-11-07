import axios, {AxiosInstance} from 'axios';
import {WEATHER_API_KEY} from '@env';

// export const baseURL = 'http://192.168.89.51:3000';
// export const baseURL = 'http://192.168.0.244:3000'; // --> Danubio
// export const baseURL = 'http://192.168.0.102:3000'; // --> Elizeth
// export const baseURL = 'http://192.168.1.13:3000'; // --> Nala
export const baseURL = 'http://192.168.89.185:3000'; // --> Riwi
export const weatherBaseURL = 'https://api.openweathermap.org/data/2.5/weather';

// const WEATHER_API_KEY = '3856a833ab41d919ab1ac5bcd4a63399';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 5000,
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
    appid: `${WEATHER_API_KEY}`,
    lang: 'en',
    units: 'metric',
  },
});
