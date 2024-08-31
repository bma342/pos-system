export type OrderType = 'pickup' | 'delivery' | 'dine-in';

export interface TopSellingItem {
  id: string;
  name: string;
  quantity: number;
  revenue: number;
}

export interface RevenueData {
  date: string;
  revenue: number;
}

export interface CustomerMetrics {
  totalCustomers: number;
  newCustomers: number;
  returningCustomers: number;
  averageOrderValue: number;
}

// Update the CartItem interface
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// Update the User interface
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  clientId: string;
  restaurantName?: string;
}

// Add this to the existing types
export interface CorePOSProfile extends POSProfile {
  // Add any additional properties specific to CorePOSProfile
}

// Update the Discount interface
export interface Discount {
  id: number;
  name: string;
  type: 'percentage' | 'fixed' | 'bogo';
  value: number;
  code?: string;
  startDate: Date;
  endDate: Date;
  expirationDate: Date;
  isActive: boolean;
  usageLimit?: number;
  usageCount: number;
  minPurchaseAmount?: number;
  maxDiscountAmount?: number;
  applicableItems?: string;
  applicableCategories?: string;
}

// Add or update these types
export type UserRole = 'admin' | 'manager' | 'staff' | 'user' | 'clientAdmin';

export interface ABTest {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  variants: ABTestVariant[];
}

export interface ABTestVariant {
  id: string;
  name: string;
  weight: number;
}

export interface ClientBranding {
  id: string;
  clientId: string;
  favicon: string;
  accentColor: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
}

export interface RealtimeMetrics {
  todaySales: number;
  todayOrders: number;
  averageOrderValue: number;
  newGuests: number;
  returningGuests: number;
  mostPopularItem: string;
}

// Update the OrderState interface
export interface OrderState {
  orders: Order[];
  activeOrders: Order[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// ... (keep all other existing interfaces and types)