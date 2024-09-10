import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api/authApi';
import { User, UserRole } from '../types/userTypes';

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isGlobalAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Implement token validation and user data fetching
      // For now, we'll just set isAuthenticated to true
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login(email, password);
      const userData: User = {
        ...response.user,
        role: response.user.role as UserRole,
        clientId: response.user.clientId || '',
      };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('token', response.token);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  const isGlobalAdmin = user?.role === UserRole.GLOBAL_ADMIN;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isGlobalAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
