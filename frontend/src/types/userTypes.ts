export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  tenantId: string;
  restaurantName?: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  STAFF = 'STAFF',
}

export interface AuthResponse {
  user: User;
  token: string;
}
