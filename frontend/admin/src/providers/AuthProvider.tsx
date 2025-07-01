/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import type { ReactNode } from 'react';
import { api } from '../lib/axios';

export type Role = 'admin' | 'user';

interface User {
  id: number;
  name: string;
  email: string;
  image: string | null;
  phone_number: string | null;
  status: Role;
  createdAt: string;
  updatedAt: string;
}

interface DecodedToken {
  exp: number; // en segundos
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

let refreshTimeout: NodeJS.Timeout;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    if (refreshTimeout) clearTimeout(refreshTimeout);
  };

  const scheduleTokenRefresh = (token: string) => {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      const expInMs = decoded.exp * 1000;
      const now = Date.now();
      const timeUntilRefresh = expInMs - now - (60_000*5); // 5 min antes

      if (timeUntilRefresh > 0) {
        refreshTimeout = setTimeout(async () => {
          try {
            const response = await api.post('/employee/refresh', {})
            const newToken = response.data.employee;
            const newUser = response.data.authorisation.token;

            localStorage.setItem('token', newToken);
            localStorage.setItem('user', JSON.stringify(newUser));
            setUser(newUser);

            scheduleTokenRefresh(newToken); // reprogramar con el nuevo token
          } catch (err) {
            console.error('Error al refrescar token:', err);
            logout();
          }
        }, timeUntilRefresh);
      } else {
        logout(); // Token expirado o por expirar ya
      }
    } catch (e) {
      console.error('Token inválido al programar refresh:', e);
      logout();
    }
  };

  const login = (userData: User, token: string) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    setUser(userData);
    scheduleTokenRefresh(token);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        const now = Date.now() / 1000;

        if (decoded.exp > now) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          scheduleTokenRefresh(token);
        } else {
          logout(); // si ya expiró, cerramos sesión
        }
      } catch (err) {
        console.error('Token inválido al iniciar:', err);
        logout();
      }
    }

    setLoading(false);
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
