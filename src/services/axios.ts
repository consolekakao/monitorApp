import axios, {AxiosInstance} from 'axios';
import {BASE_URL} from '@env';

let instance: AxiosInstance;

const responseSuccessHandler = (response: any) => response;
const responseErrorHandler = (error: any) => {
  return Promise.reject(error);
};

export default function axiosInstance() {
  if (instance === undefined) {
    const axiosConfig = {
      BASE_URL,
      timeout: 3000,
    };
    instance = axios.create(axiosConfig);

    instance.interceptors.response.use(
      response => responseSuccessHandler(response),
      error => responseErrorHandler(error),
    );
  }

  return instance;
}
