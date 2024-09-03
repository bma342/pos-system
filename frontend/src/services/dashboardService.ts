import axios, { AxiosInstance } from 'axios';

export interface DashboardData {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  activeUsers: number;
  newCustomers: number;
  topSellingItems: string[];
  totalLocations: number;
  totalClients?: number;
}

class DashboardService {
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getDashboardData(clientId: string | 'all'): Promise<DashboardData> {
    try {
      const endpoint =
        clientId === 'all'
          ? '/api/dashboard/global-data'
          : `/api/dashboard/data/${clientId}`;
      const response = await this.apiClient.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw new Error('Failed to fetch dashboard data');
    }
  }

  async getLocationData(clientId: string): Promise<{ totalLocations: number }> {
    try {
      const response = await this.apiClient.get(
        `/api/locations/count/${clientId}`
      );
      return { totalLocations: response.data.count };
    } catch (error) {
      console.error('Error fetching location data:', error);
      throw new Error('Failed to fetch location data');
    }
  }

  setAuthToken(token: string) {
    this.apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}

export const dashboardService = new DashboardService();
