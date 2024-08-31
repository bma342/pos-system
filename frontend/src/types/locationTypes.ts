export interface LocationUpdateData {
  name?: string;
  address?: string;
  phoneNumber?: string;
  // ... other updatable location fields
}

export interface Location {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  // ... other location fields
}

export interface LocationCreateData {
  name: string;
  address: string;
  phoneNumber: string;
  clientId: string;
  // ... other fields needed for creating a location
}
