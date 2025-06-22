import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://localhost:8080/api';

class AuthService {
  async login(email, password) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      const data = await response.json();
      this.setToken(data.token);
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
  
  async register(name, email, password) {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }
  
  async socialLogin(provider, token) {
    try {
      const response = await fetch(`${API_URL}/auth/${provider}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      
      if (!response.ok) {
        throw new Error(`${provider} login failed`);
      }
      
      const data = await response.json();
      this.setToken(data.token);
      return data;
    } catch (error) {
      console.error(`${provider} login error:`, error);
      throw error;
    }
  }
  
  logout() {
    localStorage.removeItem('token');
  }
  
  setToken(token) {
    localStorage.setItem('token', token);
  }
  
  getToken() {
    return localStorage.getItem('token');
  }
  
  isAuthenticated() {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      const decoded = jwtDecode(token);
      return decoded.exp > Date.now() / 1000;
    } catch (error) {
      return false;
    }
  }
  
  getUser() {
    const token = this.getToken();
    if (!token) return null;
    
    try {
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  }
}

export default new AuthService();