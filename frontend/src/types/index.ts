import type { POSType as ImportedPOSType, CorePOSProfile, LocationPOSProfile, POSMenuItem, POSCategory, POSOrder, POSOrderItem } from './posTypes';
import type { User } from './userTypes';
import type { Order, OrderItem, OrderStatus } from './orderTypes';
import type { POSIntegration as POSIntegrationType } from './posIntegrationTypes';
import type { Provider } from './providerTypes';
import type { PaginatedResponse } from './paginationTypes';

// Import and export types from providerTypes and paginationTypes
export type { Provider, PaginatedResponse };

// Export types from other files
export * from './userTypes';
export * from './clientTypes';
export * from './locationTypes';
export * from './menuTypes';
export type { Order, OrderItem, OrderStatus };
export * from './cateringOrderTypes';
export * from './inventoryTypes';
export * from './posTypes';
export type { POSIntegrationType };
export * from './loyaltyTypes';
export * from './walletTypes';
export * from './guestTypes';
export * from './revenueTypes';
export * from './serviceFeeTypes';
export * from './discountTypes';

// Re-export specific types with aliases
export type { POSType as POSTypeAlias } from './posTypes';

// Define core interfaces
export interface RealtimeMetrics {
  todaySales: number;
  todayOrders: number;
  averageOrderValue: number;
  newGuests: number;
  activeGuests: number;
  topSellingItems: Array<{ itemId: string; itemName: string; quantity: number }>;
}

export interface Challenge {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  reward: string;
  clientId: string;
  locationId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TopSellingItem {
  id: number;
  name: string;
  quantity: number;
  revenue: number;
}

export interface ClientConfig {
  id: string;
  name: string;
  settings: Record<string, any>;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export type UserRole = 'admin' | 'manager' | 'staff' | 'customer';

export type POSType = ImportedPOSType;

// Service Fee related types
export interface ServiceFee {
  id: string;
  clientId: string;
  name: string;
  amount: number;
  type: 'FIXED' | 'PERCENTAGE';
}

// Dashboard related types
export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  topSellingItems: { itemId: string; itemName: string; quantity: number }[];
}

// Inventory related types
export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  lowStockThreshold: number;
}

// Discount related types
export interface Discount {
  id: string;
  clientId: string;
  name: string;
  code: string;
  type: 'PERCENTAGE' | 'FIXED_AMOUNT';
  value: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

// Guest related types
export interface Guest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  lastVisit?: string;
}

// Catering Order related types
export interface CateringOrder extends Order {
  eventDate: string;
  eventType: string;
  deliveryAddress: string;
  specialInstructions?: string;
}

// Revenue related types
export interface RevenueData {
  date: string;
  totalRevenue: number;
  orderCount: number;
}

// Settings related types
export interface Settings {
  id: string;
  clientId: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  // Add other settings as needed
}

// Re-export POS-related types
export type {
  CorePOSProfile,
  LocationPOSProfile,
  POSMenuItem,
  POSCategory,
  POSOrder,
  POSOrderItem,
  POSIntegrationType as POSIntegration
};

// Add any other shared interfaces or types here

// Add these export statements if they don't exist
export type { RealtimeMetrics } from './realtimeMetricsTypes';
export type { RevenueData } from './revenueTypes';
export type { Review } from './reviewTypes';