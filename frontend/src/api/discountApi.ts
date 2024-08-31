import { apiCall } from '../services/api';
import { Discount } from '../types';

export const getDiscounts = () =>
  apiCall<Discount[]>({ url: '/discounts', method: 'GET' });

export const createDiscount = (discount: Omit<Discount, 'id' | 'usageCount'>) =>
  apiCall<Discount>({ url: '/discounts', method: 'POST', data: discount });

export const updateDiscount = (id: number, discount: Partial<Discount>) =>
  apiCall<Discount>({ url: `/discounts/${id}`, method: 'PUT', data: discount });

export const deleteDiscount = (id: number) =>
  apiCall<void>({ url: `/discounts/${id}`, method: 'DELETE' });

export const applyDiscount = (code: string, cartTotal: number) =>
  apiCall<{ discountedTotal: number; appliedDiscount: Discount }>({
    url: '/discounts/apply',
    method: 'POST',
    data: { code, cartTotal },
  });

export const syncDiscountsFromPOS = (locationId: number) =>
  apiCall<void>({
    url: '/discounts/sync-from-pos',
    method: 'POST',
    data: { locationId },
  });

export const syncDiscountsForAllLocations = () =>
  apiCall<void>({ url: '/discounts/sync-all-locations', method: 'POST' });

export const fetchDiscountsByLocation = (clientId: number) =>
  apiCall<Discount[]>({
    url: `/discounts/by-location/${clientId}`,
    method: 'GET',
  });
