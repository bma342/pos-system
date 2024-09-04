import axios from 'axios';
import { CateringOrder, CateringMenu, CateringEvent } from '../types/cateringTypes';

const BASE_URL = '/api/catering';

export const fetchCateringOrders = async (clientId: string): Promise<CateringOrder[]> => {
  const response = await axios.get(`${BASE_URL}/orders`, { params: { clientId } });
  return response.data;
};

export const createCateringOrder = async (order: Omit<CateringOrder, 'id'>): Promise<CateringOrder> => {
  const response = await axios.post(`${BASE_URL}/orders`, order);
  return response.data;
};

export const updateCateringOrder = async (orderId: string, order: Partial<CateringOrder>): Promise<CateringOrder> => {
  const response = await axios.put(`${BASE_URL}/orders/${orderId}`, order);
  return response.data;
};

export const deleteCateringOrder = async (clientId: string, orderId: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/clients/${clientId}/orders/${orderId}`);
};

export const fetchCateringMenu = async (clientId: string): Promise<CateringMenu> => {
  const response = await axios.get(`${BASE_URL}/menu`, { params: { clientId } });
  return response.data;
};

export const updateCateringMenu = async (clientId: string, menu: Partial<CateringMenu>): Promise<CateringMenu> => {
  const response = await axios.put(`${BASE_URL}/menu`, menu, { params: { clientId } });
  return response.data;
};

export const createCateringEvent = async (event: Omit<CateringEvent, 'id'>): Promise<CateringEvent> => {
  const response = await axios.post(`${BASE_URL}/events`, event);
  return response.data;
};

export const fetchCateringEvents = async (clientId: string): Promise<CateringEvent[]> => {
  const response = await axios.get(`${BASE_URL}/events`, { params: { clientId } });
  return response.data;
};

export const getCateringOrders = fetchCateringOrders;
export const updateCateringOrderStatus = async (clientId: string, locationId: string, orderId: number, newStatus: string): Promise<CateringOrder> => {
  const response = await axios.put(`${BASE_URL}/clients/${clientId}/locations/${locationId}/orders/${orderId}/status`, { newStatus });
  return response.data;
};