export interface ReviewCreateData {
  orderId: string;
  rating: number;
  comment: string;
  // ... other fields needed for creating a review
}

export interface Review {
  id: string;
  orderId: string;
  rating: number;
  comment: string;
  createdAt: string;
  // ... other review fields
}
