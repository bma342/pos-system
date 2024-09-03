export interface Provider {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  isActive: boolean;
  clientId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
