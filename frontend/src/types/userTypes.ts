export enum UserRole {
  GUEST = 'GUEST',
  CLIENT_ADMIN = 'CLIENT_ADMIN',
  GLOBAL_ADMIN = 'GLOBAL_ADMIN',
  EMPLOYEE = 'EMPLOYEE',
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  // Add any other user properties
}

export interface AuthResponse {
  token: string;
  user: User;
}
