import apiClient from './axios';
import { Discount } from '../types';

interface DiscountSchedule {
  startDate: string;
  endDate: string;
  recurrence?: 'daily' | 'weekly' | 'monthly';
  discountId: number;
}

// Create a new discount
export const createDiscount = async (
  discountData: Partial<Discount>
): Promise<Discount> => {
  const response = await apiClient.post<Discount>(
    '/api/discounts/create',
    discountData
  );
  return response.data;
};

// Fetch discounts by location
export const fetchDiscountsByLocation = async (
  locationId: number
): Promise<Discount[]> => {
  const response = await apiClient.get<Discount[]>(
    `/api/discounts/location/${locationId}`
  );
  return response.data;
};

// Update an existing discount
export const updateDiscount = async (
  discountId: number,
  discountData: Partial<Discount>
): Promise<Discount> => {
  const response = await apiClient.put<Discount>(
    `/api/discounts/${discountId}`,
    discountData
  );
  return response.data;
};

// Delete a discount
export const deleteDiscount = async (discountId: number): Promise<void> => {
  await apiClient.delete(`/api/discounts/${discountId}`);
};

// Schedule a discount drop
export const scheduleDiscountDrop = async (
  scheduleData: DiscountSchedule
): Promise<void> => {
  await apiClient.post('/api/discounts/schedule-drop', scheduleData);
};
