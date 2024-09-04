import { fetchClientConfig, updateClientConfig } from '../api/clientApi';
import { ClientConfig } from '../types/clientTypes';

export const clientConfigService = {
  getClientConfig: fetchClientConfig,
  updateClientConfig,
};
