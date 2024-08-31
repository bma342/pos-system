import axios from 'axios';
import { CateringOrder } from '../types/cateringTypes';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchCateringOrders = async (
  tenantId: string
): Promise<CateringOrder[]> => {
  const response = await axios.get(
    `${API_BASE_URL}/tenants/${tenantId}/catering-orders`
  );
  return response.data;
};

export const updateCateringOrder = async (
  tenantId: string,
  order: CateringOrder
): Promise<CateringOrder> => {
  const response = await axios.put(
    `${API_BASE_URL}/tenants/${tenantId}/catering-orders/${order.id}`,
    order
  );
  return response.data;
};

export const deleteCateringOrder = async (
  tenantId: string,
  orderId: number
): Promise<void> => {
  await axios.delete(
    `${API_BASE_URL}/tenants/${tenantId}/catering-orders/${orderId}`
  );
};
