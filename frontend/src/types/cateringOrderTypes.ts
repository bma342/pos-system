import { Order, OrderItem } from './orderTypes';

export interface CateringOrder extends Order {
  eventDate: Date;
  eventType: string;
  deliveryAddress: string;
  specialInstructions?: string;
}

export interface CateringOrderItem extends OrderItem {
  cateringSpecificField?: string; // Add any catering-specific fields here
}