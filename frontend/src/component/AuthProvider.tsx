import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import User from '../types/User';
import authService from '../services/authService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signin: (email: string, password: string) => Promise<void>;
  signout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const checkTokenValidity = async (signout: () => Promise<void>) => {
  try {
    const response = await authService.checkSession();

    if (!response.ok) {
      console.log('Session abgelaufen. Benutzer wird ausgeloggt.');
      signout();
    }
  } catch (error) {
    console.error('Fehler bei der Session-Überprüfung:', error);
    signout();
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
    // Alle 60 Sekunden überprüfen, ob das Token noch gültig ist
    const interval = setInterval(checkTokenValidity, 60000, signout);

    return () => clearInterval(interval);
  }, []);

  const signin = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userData = await authService.login(email, password);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Login fehlgeschlagen:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signout = async () => {
    setUser(null);
    localStorage.removeItem('user');
    await authService.logout();
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, loading, signin, signout }}>
      {!loading && children}
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
