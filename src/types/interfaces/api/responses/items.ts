import { Item } from '../item';
import { ResponseBase } from './base';

export interface ItemsResponse extends ResponseBase {
  items: Item[];
  total: number;
  rowCount: number;
  current: number;
}
