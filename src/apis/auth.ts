import { RequestMethod } from '../types/enums/request-method';
import Cookies from 'js-cookie';

import { AuthRequest } from '../types/interfaces/api/requests/auth';
import { AuthResponse } from '../types/interfaces/api/responses/auth';
import { Base } from './base';
import { BROWSER_KEYS } from '../constants/browser-keys';
import { RequestBase } from '../types/interfaces/api/requests/base';
import { RequestHeaderKey } from '../types/enums/request-header-key';

export class AuthApi extends Base {
  private readonly baseRoute = 'auth';

  async get(): Promise<AuthResponse> {
    return this.request<RequestBase, AuthResponse>(this.baseRoute);
  }

  async create(payload: AuthRequest): Promise<AuthResponse> {
    const response = await this.request<AuthRequest, AuthResponse>(
      this.baseRoute, RequestMethod.POST, {}, payload
    );

    if (this.headers[RequestHeaderKey.AUTHORIZATION]) {
      Cookies.set(BROWSER_KEYS.TOKEN, this.headers[RequestHeaderKey.AUTHORIZATION]);
    }

    return response;
  }
}
