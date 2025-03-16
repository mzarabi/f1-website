import { useQuery } from '@tanstack/react-query';
import { fetchRaces, Race } from '../services/raceService';

export const useNextRace = () => {
  return useQuery({
    queryKey: ['races'],
    queryFn: fetchRaces,
    select: (races: Race[]) => {
      const now = new Date();
      return races.find(race => {
        const raceDate = new Date(`${race.date}T${race.time}`);
        return raceDate > now;
      });
    }
  });
}; 