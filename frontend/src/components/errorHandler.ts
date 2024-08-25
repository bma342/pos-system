import { toast } from 'react-toastify';

export const logError = (message: string, error: Error, info?: unknown) => {
  console.error(message, error, info);
  // Here you can add logic to send error reports to your server or a service like Sentry
};

export const handleApiError = (error: unknown) => {
  if (error instanceof Error && 'response' in error && error.response) {
    // The request was made and the server responded with a status code
    toast.error(
      `Error: ${
        (error.response as { data?: { message?: string } })?.data?.message ||
        'An unexpected error occurred'
      }`
    );
    logError('API error', error, error.response);
  } else if (error instanceof Error && 'request' in error && error.request) {
    // The request was made but no response was received
    toast.error('Network error. Please check your connection.');
    logError('Network error', error);
  } else {
    // Something happened in setting up the request that triggered an Error
    toast.error('An unexpected error occurred');
    logError('Unexpected error', error as Error);
  }
};
