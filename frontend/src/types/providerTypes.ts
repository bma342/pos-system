export interface Provider {
  id: string;
  name: string;
  type: string;
  isActive: boolean;
  // Add other relevant properties
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
