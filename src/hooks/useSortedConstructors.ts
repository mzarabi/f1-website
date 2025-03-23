import { useConstructors } from './useConstructors';
import { useConstructorStandings } from './useConstructorStandings';
import { useMemo } from 'react';

export const useSortedConstructors = () => {
  const { data: constructors, isLoading: isConstructorsLoading, error: constructorsError } = useConstructors();
  const { data: constructorStandings, isLoading: isStandingsLoading, error: standingsError } = useConstructorStandings();
  
  const sortedConstructors = useMemo(() => {
    if (!constructors || !constructorStandings) return null;
    
    const positionMap = new Map();
    constructorStandings.forEach(standing => {
      positionMap.set(standing.Constructor.constructorId, parseInt(standing.position));
    });
    
    const constructorsWithPosition = constructors.map(constructor => {
      const position = positionMap.get(constructor.constructorId) || 999;
      return { ...constructor, position };
    });
    
    return constructorsWithPosition.sort((a, b) => a.position - b.position);
  }, [constructors, constructorStandings]);
  
  return {
    data: sortedConstructors,
    isLoading: isConstructorsLoading || isStandingsLoading,
    error: constructorsError || standingsError
  };
}; 