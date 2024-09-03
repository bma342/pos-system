import axios from 'axios';
import { POSProfile } from '../types';

const API_URL = '/api/core-pos-profiles';

export const corePOSProfileService = {
  getCorePOSProfiles: async (): Promise<CorePOSProfile[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },
};
