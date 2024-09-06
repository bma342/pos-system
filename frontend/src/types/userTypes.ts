export enum UserRole {
  EMPLOYEE = 'EMPLOYEE',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
  GUEST = 'GUEST',
  CLIENT_ADMIN = 'CLIENT_ADMIN',
  GLOBAL_ADMIN = 'GLOBAL_ADMIN',
  LOCATION_ADMIN = 'LOCATION_ADMIN'  // Add this line
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  clientId: string;
  locationId?: string;
  firstName?: string;
  lastName?: string;
  restaurantName?: string;
  cuisineType?: string;
  phoneNumber?: string;
  address?: string;
  timeZone?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
