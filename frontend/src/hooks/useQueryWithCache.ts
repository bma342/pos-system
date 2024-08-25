import { useQuery, QueryKey, UseQueryOptions } from 'react-query';
import axiosInstance from '../api/axios';

export function useQueryWithCache<T>(
  queryKey: QueryKey,
  url: string,
  options?: UseQueryOptions<T, Error>
) {
  return useQuery<T, Error>(
    queryKey,
    async () => {
      const { data } = await axiosInstance.get<T>(url);
      return data;
    },
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      ...options,
    }
  );
}
