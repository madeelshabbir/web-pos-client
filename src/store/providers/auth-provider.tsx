import { useState, type FC, useEffect } from 'react';
import Cookies from 'js-cookie';

import { AuthApi } from "../../apis/auth";
import { AuthRequest } from "../../types/interfaces/api/requests/auth";
import { AuthResponse } from "../../types/interfaces/api/responses/auth";
import { AuthContext } from '../../contexts/auth-context';
import { ContainerProps } from '../../types/interfaces/container-props';
import { notify } from '../../utils/toastify';
import { Toast } from '../../types/enums/toast';
import { BROWSER_KEYS } from '../../constants/browser-keys';
import { ResponseBase } from '../../types/interfaces/api/responses/base';
import { useNavigate } from 'react-router-dom';


const AuthProvider: FC<ContainerProps> = ({ children }) => {
  const [user, setUser] = useState<AuthResponse | ResponseBase>({});
  const navigate = useNavigate();

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (payload: AuthRequest): Promise<AuthResponse | ResponseBase> => {
    const response = await new AuthApi().create(payload);

    if (response.error) {
      response.error.general && notify(response.error.general, Toast.ERROR);
    } else {
      setUser(response);
      localStorage.setItem('user', JSON.stringify(response));
      navigate('/');
    }

    return response;
  }

  const logout = (): void => {
    const { TOKEN, USER } = BROWSER_KEYS;
    Cookies.remove(TOKEN);
    localStorage.removeItem(USER);
    setUser({});
    navigate('/login');
  }

  const refreshUser = () => {
    const stringfiedUser = localStorage.getItem('user');
    if (stringfiedUser) {
      setUser(JSON.parse(stringfiedUser));
    } else {
      (async () => {
        const response = await new AuthApi().get();
        if (response.error) {
          navigate('/login');
          notify(response.error.general, Toast.ERROR);
        } else {
          localStorage.setItem('user', JSON.stringify(response));
          setUser(response);
        }
      })();
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
};

export default AuthProvider;
