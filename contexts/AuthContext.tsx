import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  socialLogin: (provider: 'google' | 'apple' | 'facebook') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing auth state on app load
  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      // TODO: Check for stored auth token/credentials
      // For now, we'll simulate a check
      setIsLoading(false);
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // TODO: Implement actual login logic
      // For now, simulate login
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
      };
      setUser(mockUser);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      // TODO: Implement actual signup logic
      // For now, simulate signup
      const mockUser: User = {
        id: '1',
        email,
        name,
      };
      setUser(mockUser);
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    // TODO: Clear stored auth tokens
  };

  const socialLogin = async (provider: 'google' | 'apple' | 'facebook') => {
    try {
      setIsLoading(true);
      // TODO: Implement social login logic
      // For now, simulate social login
      const mockUser: User = {
        id: '1',
        email: `user@${provider}.com`,
        name: `${provider} User`,
      };
      setUser(mockUser);
    } catch (error) {
      console.error(`${provider} login failed:`, error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    socialLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
