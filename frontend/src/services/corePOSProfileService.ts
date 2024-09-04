import {
  fetchPOSProfiles,
  fetchPOSProfile,
  createPOSProfile,
  updatePOSProfile,
  deletePOSProfile,
  fetchPOSIntegrations,
  fetchPOSIntegration,
  createPOSIntegration,
  updatePOSIntegration,
  deletePOSIntegration,
} from '../api/posProfileApi';
import { POSProfile, POSIntegration } from '../types/posTypes';

export const corePOSProfileService = {
  getCorePOSProfiles: fetchPOSProfiles,
  getCorePOSProfile: fetchPOSProfile,
  createCorePOSProfile: createPOSProfile,
  updateCorePOSProfile: updatePOSProfile,
  deleteCorePOSProfile: deletePOSProfile,
  getPOSIntegrations: fetchPOSIntegrations,
  getPOSIntegration: fetchPOSIntegration,
  createPOSIntegration,
  updatePOSIntegration,
  deletePOSIntegration,
};
