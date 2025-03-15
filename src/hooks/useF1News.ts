import { useQuery } from '@tanstack/react-query';
import { getF1News } from '../services/newsService';

export const useF1News = () => {
  return useQuery({
    queryKey: ['f1news'],
    queryFn: getF1News,
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
}; 