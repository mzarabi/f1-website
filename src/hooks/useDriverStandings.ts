import { useQuery } from '@tanstack/react-query';
import { getDriverStandings } from '../services/driverService';
import type { DriverStanding } from '../types/driverStandings';

export const useDriverStandings = () => {
  return useQuery<DriverStanding[]>({
    queryKey: ['driverStandings'],
    queryFn: getDriverStandings,
  });
}; 