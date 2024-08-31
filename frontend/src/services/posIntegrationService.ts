import axios from 'axios';
import { POSIntegration } from '../types/posIntegrationTypes';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

export class POSIntegrationService {
  async getPOSIntegration(tenantId: string): Promise<POSIntegration> {
    const response = await axios.get(
      `${API_BASE_URL}/tenants/${tenantId}/pos-integration`
    );
    return response.data;
  }

  async updatePOSIntegration(
    tenantId: string,
    integration: Partial<POSIntegration>
  ): Promise<POSIntegration> {
    const response = await axios.put(
      `${API_BASE_URL}/tenants/${tenantId}/pos-integration`,
      integration
    );
    return response.data;
  }

  async syncPOS(tenantId: string): Promise<void> {
    await axios.post(
      `${API_BASE_URL}/tenants/${tenantId}/pos-integration/sync`
    );
  }

  async getAvailableIntegrations(): Promise<string[]> {
    const response = await axios.get('/api/pos-integrations');
    return response.data;
  }

  async getLastDiscountSyncTime(clientId: string): Promise<string> {
    const response = await axios.get(
      `/api/clients/${clientId}/pos-discount-sync`
    );
    return response.data.lastSyncTime;
  }

  async syncDiscounts(clientId: string): Promise<void> {
    await axios.post(`/api/clients/${clientId}/pos-discount-sync`);
  }

  // Add other POS integration methods as needed
}
