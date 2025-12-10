import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'FieldTeam' | 'Responder' | 'Manager' | 'Executive';

export interface User {
  uid: string;
  username: string;
  email: string;
  role: UserRole;
  phone: string | null;
  gender: string | null;
  location: string | null;
  otpEnabled: boolean;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (userData: Omit<User, 'uid' | 'createdAt'> & { password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string, role: UserRole) => {
    setLoading(true);
    // Simulated login - replace with actual Firebase/Supabase auth
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({
      uid: '1',
      username: email.split('@')[0],
      email,
      role,
      phone: null,
      gender: null,
      location: null,
      otpEnabled: false,
      createdAt: new Date(),
    });
    setLoading(false);
  };

  const signup = async (userData: Omit<User, 'uid' | 'createdAt'> & { password: string }) => {
    setLoading(true);
    // Simulated signup - replace with actual Firebase/Supabase auth
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
