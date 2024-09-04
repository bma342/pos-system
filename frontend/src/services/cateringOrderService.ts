import { getCateringOrders, updateCateringOrderStatus, deleteCateringOrder } from '../api/cateringApi';
import { CateringOrder, OrderStatus } from '../types/cateringTypes';

export class CateringOrderService {
  async fetchOrders(clientId: string): Promise<CateringOrder[]> {
    return getCateringOrders(clientId);
  }

  async updateOrderStatus(clientId: string, locationId: string, orderId: number, newStatus: OrderStatus): Promise<CateringOrder> {
    return updateCateringOrderStatus(clientId, locationId, orderId, newStatus);
  }

  async deleteOrder(clientId: string, orderId: number): Promise<void> {
    return deleteCateringOrder(clientId, orderId);
  }
}
