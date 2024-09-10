export interface Review {
  id: string;
  menuItemId: string;
  userId: string;
  userName: string;
  firstName: string;
  lastInitial: string;
  rating: number;
  content: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
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
