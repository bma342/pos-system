import { POSType } from './posIntegrationTypes';

export interface ClientPreferences {
  theme: string;
  language: string;
  notifications: boolean;
  preferredPOS: POSType;
  // ... other preference fields
}

export interface Client {
  id: string;
  name: string;
  preferences: ClientPreferences;
  posType: POSType;
  // ... other client fields
}

export interface ClientBranding {
  primaryColor: string;
  secondaryColor: string;
  logo: string;
  // ... other branding fields
}
