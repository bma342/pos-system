import { POSType } from './posIntegrationTypes';

export interface ClientPreferences {
  id: number;
  clientId: number;
  language: string;
  currency: string;
  timeFormat: '12h' | '24h';
  dateFormat: string;
  timezone: string;
}

export interface Client {
  id: number;
  name: string;
  subdomain: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ClientBranding {
  id: number;
  clientId: number;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  customCss: string;
}

export interface ClientConfig {
  id: string;
  name: string;
  settings: Record<string, any>;
  theme: string;
  features: string[]
  // Add other properties as needed
}

export interface ClientData {
  name: string;
  domain: string;
  primaryColor: string;
  secondaryColor: string;
  logo: string;
  features: {
    loyalty: boolean;
    onlineOrdering: boolean;
    tableReservations: boolean;
  };
}

export interface ClientCreateData {
  name: string;
  subdomain: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface ClientMetrics {
  totalClients: number;
  newClients: number;
  activeClients: number;
  averageOrderValue: number;
  repeatClientRate: number;
  clientRetentionRate: number;
  clientLifetimeValue: number;
  averageOrdersPerClient: number;
  topClients: {
    clientId: string;
    name: string;
    totalOrders: number;
    totalSpent: number;
  }[];
  clientSatisfactionScore: number;
  lastUpdated: string; // ISO date string
}
