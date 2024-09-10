export interface LocationProfile {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  gpsCoordinates: {
    latitude: number;
    longitude: number;
  };
  standardHours: {
    open: string;
    close: string;
  }[];
  temporaryHours?: {
    startDate: string;
    endDate: string;
    open: string;
    close: string;
  }[];
  image?: string;
}

export interface LocationUpdateData {
  name?: string;
  address?: string;
  phoneNumber?: string;
  // ... other updatable location fields
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  isDropoffSite: boolean;
  clientId: string;
  imageUrl?: string;
}

export interface LocationCreateData {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phoneNumber: string;
  email: string;
  timezone: string;
  isActive: boolean;
  clientId: number;
}

export interface LocationHours {
  id: number;
  locationId: number;
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}

export interface LocationMenu {
  id: number;
  locationId: number;
  name: string;
  description: string;
  isActive: boolean;
  items: MenuItem[];
}

export interface MenuItem {
  id: number;
  menuId: number;
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
}

export interface LocationSettings {
  id: string;
  locationId: string;
  operatingHours: OperatingHours[];
  deliveryRadius: number;
  minimumOrderValue: number;
  // Add other relevant settings
}

export interface LocationAnalytics {
  locationId: string;
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  // Add other relevant analytics fields
}

interface OperatingHours {
  day: string;
  openTime: string;
  closeTime: string;
}

