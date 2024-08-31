import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

export const handleApiError = (error: AxiosError | Error): void => {
  let errorMessage = 'An unexpected error occurred';

  if (error instanceof AxiosError) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      errorMessage = error.response.data.message || 'An error occurred';
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = 'No response received from server';
    } else {
      // Something happened in setting up the request that triggered an Error
      errorMessage = error.message || 'An unexpected error occurred';
    }
  } else {
    errorMessage = error.message || 'An unexpected error occurred';
  }

  // Display error message using toast
  toast.error(errorMessage);

  // Log the error for debugging purposes
  console.error('API Error:', error);
};
