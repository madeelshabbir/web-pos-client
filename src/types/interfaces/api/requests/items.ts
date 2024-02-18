import { RequestBase } from './base';

export interface ItemsRequest extends RequestBase {
  current: number;
  rowCount: number;
};
