import {AxiosError, AxiosResponse} from 'axios';
// import {Alert} from 'react-native';
// import {IHandleError} from '../services/contacts.service';
import {showSnackbar} from './snackbar.utility';
// import {IHandleError} from '../services/contacts.service';

interface IErrorResponse {
  message?: string;
  statusCode?: number;
  [key: string]: unknown;
}

interface ISucessResponse {
  code?: number;
  data?: unknown;
  message?: string;
}

function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

function processAxiosResponse<T>(
  response: AxiosResponse<T>,
  showPositiveMessage: boolean,
): Promise<T | never> {
  let userMessage = '';
  if (!String(response.status).startsWith('2')) {
    // Construct an error object with response details
    const error = {
      message: response.data
        ? (response.data as {message?: string}).message || 'Unknown error'
        : 'No response data',
      statusCode: response.status,
      responseData: response.data,
    };
    userMessage = `Status code ${
      response.statusText
    }: ${'Sucessfull response'}`;
    showSnackbar(userMessage);
    return Promise.reject(error);
  }
  const sucessfulResponse = response.data as ISucessResponse;
  userMessage = `Status code ${sucessfulResponse.code}: ${sucessfulResponse.message}`;
  if (showPositiveMessage) showSnackbar(userMessage, false);
  return Promise.resolve(response.data);
}

function processAxiosError(error: unknown): Promise<null> {
  let errorMessage = '';

  if (isAxiosError(error)) {
    if (error.response) {
      const errorData = error.response.data as IErrorResponse;
      errorMessage = `Error ${error.response.status}: ${
        errorData.message || 'Unknown error'
      }`;
    } else if (error.request) {
      errorMessage = 'No response received from server.';
    }
  } else if (error instanceof Error) {
    errorMessage += error.message;
  }
  showSnackbar(errorMessage);

  return Promise.resolve(null);
}

export async function handleAxiosResponse<T>(
  axiosCall: () => Promise<AxiosResponse<T>>,
  showPositiveMessage: boolean = false,
): Promise<T | null> {
  try {
    const response = await axiosCall();
    return processAxiosResponse(response, showPositiveMessage);
  } catch (error) {
    return processAxiosError(
      error,
      // handleError
    );
  }
}
