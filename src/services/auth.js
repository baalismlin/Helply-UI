import { jwtDecode } from "jwt-decode";
import BaseService from "./base";

class AuthService extends BaseService {
  async login(email, password) {
    const { token } = await this.post("auth/login", { email, password });
    this.setToken(token);
  }

  async register(name, email, password) {
    return await this.post("auth/register", { name, email, password });
  }

  async socialLogin(provider, token) {
    const data = await this.post(`auth/${provider}`, { token });
    this.setToken(data.token);
  }

  logout() {
    this.removeToken;
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
