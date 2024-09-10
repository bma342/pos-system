export interface Review {
  id: string;
  content: string;
  rating: number;
  userId: string;
  menuItemId: string;
  createdAt: string;
  firstName: string;
  lastInitial: string;
  // ... any other relevant fields
}

export interface ReviewCreateData {
  menuItemId: string;
  firstName: string;
  lastInitial: string;
  rating: number;
  content: string;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    [key: number]: number;
  };
}
