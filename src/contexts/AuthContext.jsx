import { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../services/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = () => {
      if (AuthService.isAuthenticated()) {
        setUser(AuthService.getUser());
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);
  
  const login = async (email, password) => {
    const response = await AuthService.login(email, password);
    setUser(AuthService.getUser());
    return response;
  };
  
  const register = async (name, email, password) => {
    return await AuthService.register(name, email, password);
  };
  
  const socialLogin = async (provider, token) => {
    const response = await AuthService.socialLogin(provider, token);
    setUser(AuthService.getUser());
    return response;
  };
  
  const logout = () => {
    AuthService.logout();
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, loading, login, register, socialLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);