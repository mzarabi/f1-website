import { useQuery } from '@tanstack/react-query';
import { fetchRaces } from '../services/raceService';

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

interface Session {
  date: string;
  time: string;
}

interface Race {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: string;
  time: string;
  FirstPractice: Session;
  SecondPractice?: Session;
  ThirdPractice?: Session;
  Qualifying: Session;
  Sprint?: Session;
  SprintQualifying?: Session;
}

interface ScheduleResponse {
  MRData: {
    RaceTable: {
      season: string;
      Races: Race[];
    };
  };
}

const fetchRaceSchedule = async () => {
  const response = await fetch('https://api.jolpi.ca/ergast/f1/2025/races/');
  const data: ScheduleResponse = await response.json();
  return data.MRData.RaceTable.Races;
};

export const useRaceSchedule = () => {
  return useQuery({
    queryKey: ['raceSchedule'],
    queryFn: fetchRaces,
  });
}; 