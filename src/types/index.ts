export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Discount {
  id: string;
  name: string;
  value: number;
  type: 'percentage' | 'fixed';
}

export * from './challengeTypes';
export * from './orderTypes';
// Export other types as needed