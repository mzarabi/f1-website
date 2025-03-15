import { useQuery } from '@tanstack/react-query';
import { getConstructorStandings } from '../services/driverService';
import type { ConstructorStanding } from '../types/constructorStandings';

export const useConstructorStandings = () => {
  return useQuery<ConstructorStanding[]>({
    queryKey: ['constructorStandings'],
    queryFn: getConstructorStandings,
  });
}; 