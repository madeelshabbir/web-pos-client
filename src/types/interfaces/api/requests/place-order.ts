import { RequestBase } from './base';

export interface PlaceOrderRequest extends RequestBase {
  itemId: string;
  price: number;
};
