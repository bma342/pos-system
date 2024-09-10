export interface OrderProvider {
  id: string;
  name: string;
  type: 'pickup' | 'delivery' | 'doordash' | 'ubereats' | 'catering';
  handleScheduledOrders: boolean;
  scheduledOrderLeadTime: number;
  isActive: boolean;
  settings: {
    [key: string]: any;
  };
}