import axios from 'axios';

interface UserData {
  username: string;
  email: string;
  password: string;
}

interface Credentials {
  email: string;
  password: string;
}

export const AuthService = {
  register: async (userData: UserData) => {
    try {
      const response = await axios.post('/api/auth/register', userData);
      return response.data;
    } catch (error) {
      throw new Error('Registration failed: ' + (error as Error).message);
    }
  },

  login: async (credentials: Credentials) => {
    try {
      const response = await axios.post('/api/auth/login', credentials);
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      return response.data;
    } catch (error) {
      throw new Error('Login failed: ' + (error as Error).message);
    }
  },

  logout: async () => {
    try {
      await axios.post('/api/auth/logout');
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    } catch (error) {
      throw new Error('Logout failed: ' + (error as Error).message);
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await axios.get('/api/auth/current-user');
      return response.data;
    } catch (error) {
      throw new Error('Failed to get current user: ' + (error as Error).message);
    }
  },

  refreshToken: async () => {
    try {
      const response = await axios.post('/api/auth/refresh-token');
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      return response.data;
    } catch (error) {
      throw new Error('Failed to refresh token: ' + (error as Error).message);
    }
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};