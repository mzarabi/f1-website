import { useDrivers } from './useDrivers';
import { useDriverStandings } from './useDriverStandings';
import { Driver } from '../types/driver';
import { useMemo } from 'react';

export const useSortedDrivers = () => {
  const { data: drivers, isLoading: isDriversLoading, error: driversError } = useDrivers();
  const { data: driverStandings, isLoading: isStandingsLoading, error: standingsError } = useDriverStandings();
  
  const sortedDrivers = useMemo(() => {
    if (!drivers || !driverStandings) return null;
    
    const positionMap = new Map();
    driverStandings.forEach(standing => {
      positionMap.set(standing.Driver.driverId, parseInt(standing.position));
    });
    
    const driversWithPosition = drivers.map(driver => {
      const position = positionMap.get(driver.driverId) || 999;   
      return { ...driver, position };
    });
    
    return driversWithPosition.sort((a, b) => a.position - b.position);
  }, [drivers, driverStandings]);
  
  return {
    data: sortedDrivers,
    isLoading: isDriversLoading || isStandingsLoading,
    error: driversError || standingsError
  };
}; 