import axios, { AxiosResponse, AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios';
import Cookies from 'js-cookie';

import { BROWSER_KEYS } from '../constants/browser-keys';
import { RequestMethod } from '../types/enums/request-method';
import { RequestHeaderKey } from '../types/enums/request-header-key';
import { notify } from '../utils/toastify';
import { Toast } from '../types/enums/toast';

export abstract class Base {
  private readonly axios;
  protected headers: RawAxiosResponseHeaders | AxiosResponseHeaders = {};

  constructor(
    headers: Partial<Record<RequestHeaderKey, string>> = {},
    timeout: number = 10000,
  ) {
    this.axios = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL as string, timeout, headers });
  }

  protected async request<T, R>(
    route: string,
    method: RequestMethod = RequestMethod.GET,
    params: Record<string, string> = {},
    body: Record<string, any> = {},
  ): Promise<R | never> {
    try {
      const response = await this.axios.request<T, AxiosResponse<R>>({
        url: route,
        method,
        params,
        data: body,
        headers: {
          [RequestHeaderKey.AUTHORIZATION]: Cookies.get(BROWSER_KEYS.TOKEN),
        },
      });

      this.headers = response.headers;
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        notify('Server down!', Toast.ERROR);
      }

      return err.response.data;
    }
  }
}
