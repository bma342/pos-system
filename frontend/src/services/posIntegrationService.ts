import { POSProfile } from '../types/posIntegrationTypes';
import {
  getProfiles,
  createProfile,
  updateProfile,
  deleteProfile,
  syncProfile
} from '../api/posIntegrationApi';

export const posIntegrationService = {
  getProfiles,
  createProfile,
  updateProfile,
  deleteProfile,
  syncProfile,
};
