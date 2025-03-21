import { useQuery } from '@tanstack/react-query';
import { fetchRaces, Race } from '../services/raceService';

interface Session {
  date: string;
  time: string;
}

export const useNextRace = () => {
  return useQuery({
    queryKey: ['races'],
    queryFn: fetchRaces,
    select: (races: Race[]) => {
      const now = new Date();
      const nextRace = races.find(race => {
        const raceDate = new Date(`${race.date}T${race.time}`);
        return raceDate > now;
      });

      if (!nextRace) return null;

      const filteredRace: Partial<Race> = {
        ...nextRace
      };

      const isUpcoming = (session?: Session) => {
        if (!session) return false;
        return new Date(`${session.date}T${session.time}`) > now;
      };

      if (!isUpcoming(nextRace.FirstPractice)) {
        filteredRace.FirstPractice = undefined;
      }
      
      if (!isUpcoming(nextRace.SecondPractice)) {
        filteredRace.SecondPractice = undefined;
      }
      
      if (!isUpcoming(nextRace.ThirdPractice)) {
        filteredRace.ThirdPractice = undefined;
      }
      
      if (!isUpcoming(nextRace.SprintQualifying)) {
        filteredRace.SprintQualifying = undefined;
      }
      
      if (!isUpcoming(nextRace.Sprint)) {
        filteredRace.Sprint = undefined;
      }
      
      if (!isUpcoming(nextRace.Qualifying)) {
        filteredRace.Qualifying = undefined;
      }
      
      return filteredRace as Race;
    }
  });
}; 