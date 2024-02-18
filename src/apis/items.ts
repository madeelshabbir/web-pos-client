import { RequestMethod } from '../types/enums/request-method';

import { Base } from './base';
import { ItemsRequest } from '../types/interfaces/api/requests/items';
import { ItemsResponse } from '../types/interfaces/api/responses/items';

export class ItemsApi extends Base {
  private readonly baseRoute = 'items';

  async get(payload: ItemsRequest): Promise<ItemsResponse> {
    return this.request<ItemsRequest, ItemsResponse>(this.baseRoute, RequestMethod.GET, payload);
  }
}
