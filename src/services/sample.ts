import {AxiosInstance} from 'axios';
import axiosInstance from './axios';
import {BASE_URL} from '@env';

const sampleUrl = 'https://api.ip.pe.kr/json/';

class SampleService {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axiosInstance();
  }

  async getIpAddress() {
    let response = await this.instance.get(sampleUrl, {});

    return response.data.ip;
  }

  async getSensorsInfo() {
    let response = await this.instance.post(BASE_URL, {
      command: 'sensors',
    });
    return response.data;
  }

  async getDiskInfo() {
    let response = await this.instance.post(BASE_URL, {
      command: 'df -m | sort -s',
    });
    return response.data;
  }

  async getMemoryInfo() {
    let response = await this.instance.post(BASE_URL, {
      command: 'free -m',
    });
    return response.data;
  }

  async pm2Info() {
    let response = await this.instance.post(BASE_URL, {
      command: 'pm2 status',
    });
    return response.data;
  }
}

let sampleServiceInstance: SampleService;

//Single pattern
export const SampleInstance = (): SampleService => {
  if (sampleServiceInstance === undefined) {
    sampleServiceInstance = new SampleService();
  }
  return sampleServiceInstance;
};
