import { useQuery } from '@tanstack/react-query';
import { getDriverList } from '../services/driverService';
import type { Driver } from '../types/driver';

export const useDrivers = () => {
  return useQuery<Driver[]>({
    queryKey: ['drivers'],
    queryFn: getDriverList,
  });
}; 