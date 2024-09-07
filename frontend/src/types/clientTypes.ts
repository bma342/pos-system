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
  id: string;
  name: string;
  // Add other relevant client fields
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
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  // Add other relevant metrics
}

export interface BrandingProfile {
  id: number;
  clientId: number;
  name: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  fontColor: string;
  secondaryFontColor: string;
}

export interface BrandingState {
  profiles: BrandingProfile[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
