import { useQuery } from '@tanstack/react-query';
import { fetchRaceResult, Race } from '../services/raceService';
import { useRaceSchedule } from './useRaceSchedule';
import { useMemo } from 'react';

interface RaceWinner {
  round: string;
  winnerName: string;
  winnerTeam: string;
}

export const useRaceWinners = () => {
  const { data: races, isLoading: isScheduleLoading } = useRaceSchedule();
  
  const completedRaces = useMemo(() => {
    if (!races) return [];
    
    const now = new Date();
    return races.filter(race => {
      const raceDate = new Date(`${race.date}T${race.time}`);
      return raceDate < now;
    });
  }, [races]);
  
  const { data: raceWinners, isLoading } = useQuery({
    queryKey: ['raceWinners'],
    queryFn: async (): Promise<RaceWinner[]> => {
      if (completedRaces.length === 0) return [];
      
      const winners: RaceWinner[] = [];
      
      for (const race of completedRaces) {
        const result = await fetchRaceResult(race.round);
        
        if (result && result.Results && result.Results.length > 0) {
          const winner = result.Results[0];
          winners.push({
            round: race.round,
            winnerName: `${winner.Driver.givenName} ${winner.Driver.familyName}`,
            winnerTeam: winner.Constructor.name
          });
        }
      }
      
      return winners;
    },
    enabled: completedRaces.length > 0 && !isScheduleLoading,
  });
  
  return {
    data: raceWinners || [],
    isLoading,
    completedRaces
  };
}; 