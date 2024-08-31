import api from './axios';
import { Discount } from '../types/discountTypes';

export const getDiscounts = async (): Promise<Discount[]> => {
  const response = await api.get<Discount[]>('/discounts');
  return response.data;
};

export const createDiscount = async (discount: Omit<Discount, 'id'>): Promise<Discount> => {
  const response = await api.post<Discount>('/discounts', discount);
  return response.data;
};

export const updateDiscount = async (id: string, discount: Partial<Discount>): Promise<Discount> => {
  const response = await api.put<Discount>(`/discounts/${id}`, discount);
  return response.data;
};

export const deleteDiscount = async (id: string): Promise<void> => {
  await api.delete(`/discounts/${id}`);
};

export const applyDiscount = async (orderId: string, discountId: string): Promise<void> => {
  await api.post(`/orders/${orderId}/apply-discount/${discountId}`);
};

export const fetchDiscountsByLocation = async (locationId: string): Promise<Discount[]> => {
  const response = await api.get<Discount[]>(`/locations/${locationId}/discounts`);
  return response.data;
};

export const syncDiscountsFromPOS = async (locationId: string): Promise<void> => {
  await api.post(`/locations/${locationId}/sync-discounts`);
};

export const syncDiscountsForAllLocations = async (): Promise<void> => {
  await api.post('/sync-all-discounts');
};