export interface ClientBranding {
  id: string;
  clientId: string;
  favicon: string;
  accentColor: string;
  // Add other necessary fields
}

export interface ClientSettings {
  id: string;
  clientId: string;
  theme: string;
  language: string;
  timezone: string;
  currency: string;
  // Add other settings as needed
}

// ... other types