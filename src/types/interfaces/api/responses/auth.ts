import { ResponseBase } from './base';

export interface AuthResponse extends ResponseBase {
  fullName: string;
  organization: string;
  expireDate: string;
  privileges: string[];
  configurations: Record<string, any>;
}
