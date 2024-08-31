export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  STAFF = 'staff',
  USER = 'user',
  CLIENT_ADMIN = 'clientAdmin'
}

export interface User {
  id: string;
  name: string;
  email: string;
  // Add other relevant user properties
}