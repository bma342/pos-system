export interface Provider {
  id: string;
  name: string;
  type: 'third_party' | 'first_party';
  orderType: 'pickup' | 'delivery' | 'catering_pickup' | 'catering_delivery';
  isActive: boolean;
  fee: number;
  feeType: 'fixed' | 'percentage';
  integrationDetails: {
    apiKey?: string;
    webhookUrl?: string;
    // Add other integration-specific fields as needed
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
