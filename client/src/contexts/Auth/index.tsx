'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { destroyCookie, setCookie, parseCookies } from 'nookies';

import { IAuthContextType } from '@/interfaces';
import api from '@/services/api';

import { cleanAuthorization, saveAuthorization } from './utils';

const AuthContext = createContext<IAuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuth, setIsAuth] = useState(false);
  const [datas, setDatas] = useState(() => {
    const cookies = parseCookies();
    const user = cookies['@user'] || '';
    const token = cookies['@token'] || '';

    const parseUser = user ? JSON.parse(user) : null;
    const parseToken = token ? JSON.parse(token) : null;
    return {
      user: parseUser || null,
      token: parseToken || null,
    };
  });

  const signIn = useCallback(
    async (userData: {
      email: string;
      password: string;
    }): Promise<{ success: boolean }> => {
      try {
        const { data } = await api.post('auth/login', userData);

        setCookie(null, '@user', JSON.stringify(data.user), {
          maxAge: 3 * 24 * 60 * 60, // 3 days
          path: '/',
        });

        setCookie(null, '@token', JSON.stringify(data.token), {
          maxAge: 3 * 24 * 60 * 60, // 3 days
          path: '/',
        });

        saveAuthorization(data.token);

        setDatas({
          user: data.user,
          token: data.token,
        });

        setIsAuth(true);
        return { success: true };
      } catch (error) {
        console.error(`Error on login: ${error}`);
        return { success: false };
      }
    },
    [],
  );

  const signOut = useCallback(async () => {
    destroyCookie(null, '@user');
    destroyCookie(null, '@token');
    setIsAuth(false);
    cleanAuthorization();
  }, []);

  const context = useMemo(() => {
    return {
      user: datas.user,
      isAuth,
      signIn,
      signOut,
    };
  }, [datas.user, signIn, signOut, isAuth]);

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth precisa ser usado com o AuthProvider!');
  }

  return context;
}

export { AuthProvider, useAuth };
