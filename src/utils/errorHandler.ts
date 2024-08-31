import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import * as Sentry from "@sentry/react";

interface ErrorResponse {
  message: string;
  code?: string;
}

export enum ErrorType {
  NETWORK = 'NETWORK',
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  UNKNOWN = 'UNKNOWN',
}

export interface AppError {
  message: string;
  type: ErrorType;
  originalError?: unknown;
}

export const handleError = (error: unknown): AppError => {
  let appError: AppError = {
    message: 'An unexpected error occurred',
    type: ErrorType.UNKNOWN,
    originalError: error,
  };

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      appError.message = axiosError.response.data?.message || 'An error occurred';
      appError.type = axiosError.response.status === 401 ? ErrorType.AUTHENTICATION : ErrorType.VALIDATION;
    } else if (axiosError.request) {
      appError.message = 'No response received from server';
      appError.type = ErrorType.NETWORK;
    } else {
      appError.message = axiosError.message || 'Error setting up the request';
      appError.type = ErrorType.NETWORK;
    }
  } else if (error instanceof Error) {
    appError.message = error.message;
  }

  // Log the error for debugging purposes
  console.error('Error:', error);

  // Send error to Sentry
  Sentry.captureException(error);

  return appError;
};

export const displayErrorNotification = (appError: AppError): void => {
  toast.error(appError.message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};