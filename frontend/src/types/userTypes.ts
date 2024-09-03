export enum UserRole {
  EMPLOYEE = 'EMPLOYEE',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
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
