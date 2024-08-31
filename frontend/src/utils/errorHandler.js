import { toast } from 'react-toastify';

export const handleApiError = (error) => {
  const message =
    error.response?.data?.message || 'An unexpected error occurred';
  toast.error(message);
  console.error('API Error:', error);
};
