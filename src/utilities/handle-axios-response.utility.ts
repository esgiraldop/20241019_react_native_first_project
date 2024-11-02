import {AxiosResponse} from 'axios';

function processAxiosResponse<T>(
  response: AxiosResponse<T>,
): Promise<T | never> {
  if (!String(response.status).startsWith('2')) {
    const errorMessage =
      (response.data as {error?: string})?.error || 'Unknown error';
    return Promise.reject(errorMessage);
  }
  return Promise.resolve(response.data);
}

function processAxiosError(error: unknown) {
  let errorMessage =
    'There was an error related to a bad axios/network connection or an undefined error';

  if (error instanceof Error) errorMessage += `: ${error.message}`;

  return Promise.reject(errorMessage);
}

export async function handleAxiosResponse<T>(
  axiosCall: () => Promise<AxiosResponse<T>>,
): Promise<T | never> {
  try {
    const response = await axiosCall();
    return processAxiosResponse(response);
  } catch (error) {
    return processAxiosError(error);
  }
}
