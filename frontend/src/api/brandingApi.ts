import axios from './axios';
import { BrandingProfile, Wallet, Discount, LoyaltyReward } from '../types';

export const fetchBrandingProfiles = async (
  clientId: number
): Promise<BrandingProfile[]> => {
  const response = await axios.get(`/branding/client/${clientId}`);
  return response.data;
};

export const saveBrandingProfile = async (
  profile: BrandingProfile
): Promise<BrandingProfile> => {
  const response = profile.id
    ? await axios.put(`/branding/client/${profile.clientId}`, profile)
    : await axios.post(`/branding/client/${profile.clientId}`, profile);
  return response.data;
};

export const uploadLogo = async (
  clientId: number,
  file: File
): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('clientId', clientId.toString());

  const response = await axios.post('/branding/upload-logo', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.url;
};

export const getWalletDetails = (clientId: number): Promise<Wallet> => {
  return axios.get(`/wallet/${clientId}`).then((response) => response.data);
};

export const getClientDiscounts = (clientId: number): Promise<Discount[]> => {
  return axios.get(`/discounts/${clientId}`).then((response) => response.data);
};

export const getLoyaltyRewards = (
  clientId: number
): Promise<LoyaltyReward[]> => {
  return axios
    .get(`/loyalty-rewards/${clientId}`)
    .then((response) => response.data);
};
