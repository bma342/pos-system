export enum UserRole {
  GUEST = 'GUEST',
  CLIENT_ADMIN = 'CLIENT_ADMIN',
  GLOBAL_ADMIN = 'GLOBAL_ADMIN',
  LOCATION_ADMIN = 'LOCATION_ADMIN'
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  clientId: string;
  firstName: string;
  lastName: string;
  restaurantName?: string;
  cuisineType?: string;
  phoneNumber?: string;
  address?: string;
  timeZone?: string;
  locationId?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
