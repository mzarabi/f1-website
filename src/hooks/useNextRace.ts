import { useQuery } from '@tanstack/react-query';

interface Location {
  lat: string;
  long: string;
  locality: string;
  country: string;
}

interface Circuit {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: Location;
}

interface Race {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: string;
  time: string;
}

interface RaceResponse {
  MRData: {
    RaceTable: {
      season: string;
      Races: Race[];
    };
  };
}

const fetchRaces = async () => {
  const response = await fetch('https://api.jolpi.ca/ergast/f1/2025/races/');
  const data: RaceResponse = await response.json();
  return data.MRData.RaceTable.Races;
};

export const useNextRace = () => {
  return useQuery({
    queryKey: ['races'],
    queryFn: fetchRaces,
    select: (races) => {
      const now = new Date();
      return races.find(race => {
        const raceDate = new Date(`${race.date}T${race.time}`);
        return raceDate > now;
      });
    }
  });
}; 