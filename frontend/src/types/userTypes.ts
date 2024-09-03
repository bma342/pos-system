export enum UserRole {
  GUEST = 'GUEST',
  CLIENT_ADMIN = 'CLIENT_ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  roles: UserRole[];
  clientId: number;
}

export interface AuthResponse {
  user: User;
  token: string;
}
