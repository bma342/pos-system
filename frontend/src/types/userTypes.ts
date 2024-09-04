export enum UserRole {
  EMPLOYEE = 'EMPLOYEE',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
  GUEST = 'GUEST',
  CLIENT_ADMIN = 'CLIENT_ADMIN',
  GLOBAL_ADMIN = 'GLOBAL_ADMIN',
  // Add other roles as needed
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  clientId: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
