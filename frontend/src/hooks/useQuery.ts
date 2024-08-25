import { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';

interface QueryResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

export function useQuery<T>(url: string): QueryResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axiosInstance.get<T>(url);
        if (isMounted) {
          setData(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setError(error as Error);
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, isLoading, error };
}
