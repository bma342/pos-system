export interface ReviewCreateData {
  orderId: string;
  locationId: string;
  menuItemId: string;
  rating: number;
  comment: string;
  tags: string[];
  images?: string[];
}

export interface Review {
  id: string;
  orderId: string;
  locationId: string;
  menuItemId: string;
  userId: string;
  rating: number;
  comment: string;
  tags: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
  helpfulCount: number;
  responseFromBusiness?: string;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: { [key: number]: number };
}
