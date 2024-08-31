import api from './axios';
import { OrderData } from '../types/orderTypes';

export const fetchOrderData = async (): Promise<OrderData[]> => {
  const response = await api.get<OrderData[]>('/orders');
  return response.data;
};