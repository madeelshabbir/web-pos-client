import { RequestBase } from './base';

export interface AuthRequest extends RequestBase {
  username: string;
  password: string;
};
