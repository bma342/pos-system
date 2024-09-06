import {
  fetchPOSProfiles,
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
  fetchPOSProfiles,
  createPOSProfile,
  updatePOSProfile,
  deletePOSProfile,
  fetchPOSIntegrations,
  fetchPOSIntegration,
  createPOSIntegration,
  updatePOSIntegration,
  deletePOSIntegration,
};

export type CorePOSProfileService = typeof corePOSProfileService;
