export interface LocationUpdateData {
  name?: string;
  address?: string;
  phoneNumber?: string;
  // ... other updatable location fields
}

export interface Location {
  id: number;
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
  createdAt: string;
  updatedAt: string;
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
