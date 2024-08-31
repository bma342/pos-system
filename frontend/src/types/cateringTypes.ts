export interface CateringOrder {
  id: number;
  clientId: string;
  customerName: string;
  orderDate: string;
  deliveryDate: string;
  status: OrderStatus;
  total: number;
  items: CateringOrderItem[];
  // Add more fields as needed
}

export interface CateringOrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  // Add more fields as needed
}

export interface CateringOrderItemModifier {
  id: number;
  modifierId: number;
  name: string;
  price: number;
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  READY = 'ready',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export interface OrderStatistics {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  // Add more statistics as needed
}
