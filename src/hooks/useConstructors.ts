import { useQuery } from '@tanstack/react-query';
import { getConstructorList } from '../services/constructorService';
import type { Constructor } from '../types/constructor';

export const useConstructors = () => {
  return useQuery<Constructor[]>({
    queryKey: ['constructors'],
    queryFn: getConstructorList,
  });
}; 