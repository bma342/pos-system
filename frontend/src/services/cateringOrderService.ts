import axios from 'axios';
import { CateringOrder, OrderStatus } from '../types/cateringTypes';

const API_URL = process.env.REACT_APP_API_URL || '/api';

export class CateringOrderService {
  async fetchOrders(
    clientId: string,
    status: string
  ): Promise<CateringOrder[]> {
    const response = await axios.get(
      `${API_URL}/clients/${clientId}/catering-orders`,
      {
        params: { status },
      }
    );
    return response.data;
  }

  async updateOrderStatus(
    clientId: string,
    orderId: number,
    newStatus: OrderStatus
  ): Promise<CateringOrder> {
    const response = await axios.patch(
      `${API_URL}/clients/${clientId}/catering-orders/${orderId}`,
      {
        status: newStatus,
      }
    );
    return response.data;
  }

  async deleteOrder(clientId: string, orderId: number): Promise<void> {
    await axios.delete(
      `${API_URL}/clients/${clientId}/catering-orders/${orderId}`
    );
  }

  // Add more methods as needed, such as creating a new order, fetching a single order, etc.
}
