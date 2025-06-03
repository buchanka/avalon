import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Создаем экземпляр axios с базовыми настройками
const api = axios.create({
  baseURL: 'http://my-shop',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/api/user/profile');
        setUser(response.data);
      } catch (error) {
        console.log('Пользователь не аутентифицирован');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/api/login', { email, password });
      setUser(response.data.user);
      return true;
    } catch (error) {
      console.error('Ошибка входа:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post('/api/logout');
      setUser(null);
    } catch (error) {
      console.error('Ошибка выхода:', error);
    }
  };

  const isAdmin = () => user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}