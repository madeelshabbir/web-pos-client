import { RequestMethod } from '../types/enums/request-method';

import { PlaceOrderRequest } from '../types/interfaces/api/requests/place-order';
import { PlaceOrderResponse } from '../types/interfaces/api/responses/place-order';
import { Base } from './base';

export class OrdersApi extends Base {
  private readonly baseRoute = 'orders';

  async create(payload: PlaceOrderRequest): Promise<PlaceOrderResponse> {
    return this.request<PlaceOrderRequest, PlaceOrderResponse>(
      this.baseRoute, RequestMethod.POST, {}, payload
    );
  }
}
