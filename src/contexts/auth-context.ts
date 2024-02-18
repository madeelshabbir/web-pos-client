import { createContext } from 'react';

import { AuthRequest } from '../types/interfaces/api/requests/auth';
import { ResponseBase } from '../types/interfaces/api/responses/base';
import { AuthResponse } from '../types/interfaces/api/responses/auth';

export const AuthContext = createContext({
  user: {},
  login: async (_: AuthRequest): Promise<AuthResponse | ResponseBase> => { return {} },
  logout: () => {},
});
