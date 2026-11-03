import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthSession } from './types';
import { authService } from './authService';
import { Role } from '../../types';

interface AuthContextType {
  session: AuthSession | null;
  user: AuthSession['user'] | null;
  role: Role | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  requestOtp: (phone: string) => Promise<{ success: boolean; simulatedOtp: string }>;
  loginWithOtp: (phone: string, otp: string) => Promise<void>;
  loginWithPassword: (email: string, pass: string) => Promise<void>;
  loginAsPersona: (personaId: string) => Promise<void>;
  registerLearner: (data: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const existing = authService.getSession();
    setSession(existing);
    setIsLoading(false);
  }, []);

  const requestOtp = async (phone: string) => {
    return authService.requestOtp(phone);
  };

  const loginWithOtp = async (phone: string, otp: string) => {
    setIsLoading(true);
    try {
      const newSession = await authService.verifyOtp(phone, otp);
      setSession(newSession);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithPassword = async (email: string, pass: string) => {
    setIsLoading(true);
    try {
      const newSession = await authService.loginWithPassword(email, pass);
      setSession(newSession);
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsPersona = async (personaId: string) => {
    setIsLoading(true);
    try {
      const newSession = await authService.loginAsPersona(personaId);
      setSession(newSession);
    } finally {
      setIsLoading(false);
    }
  };

  const registerLearner = async (data: any) => {
    setIsLoading(true);
    try {
      const newSession = await authService.registerLearner(data);
      setSession(newSession);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session ? session.user : null,
        role: session ? session.user.role : null,
        isAuthenticated: !!session,
        isLoading,
        requestOtp,
        loginWithOtp,
        loginWithPassword,
        loginAsPersona,
        registerLearner,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

