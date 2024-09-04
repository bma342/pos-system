export interface Provider {
  id: string;
  name: string;
  // Add other provider properties as needed
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number; // Add this line
}
