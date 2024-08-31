export interface Review {
  id: string;
  menuItemId: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
}