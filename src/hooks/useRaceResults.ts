import { useQuery } from '@tanstack/react-query';

interface Driver {
  givenName: string;
  familyName: string;
}

interface Constructor {
  constructorId: string;
  name: string;
}

interface Time {
  time: string;
}

interface Result {
  position: string;
  Driver: Driver;
  Constructor: Constructor;
  Time: Time;
}

interface Race {
  raceName: string;
  Circuit: {
    circuitName: string;
  };
  Results: Result[];
}

interface RaceData {
  MRData: {
    RaceTable: {
      Races: Race[];
    };
  };
}

const fetchRaceResults = async (): Promise<Race | null> => {
  const response = await fetch('https://api.jolpi.ca/ergast/f1/2025/results/');
  const data: RaceData = await response.json();
  const races = data.MRData.RaceTable.Races;
  return races.length > 0 ? races[races.length - 1] : null;
};

export const useRaceResults = () => {
  return useQuery({
    queryKey: ['raceResults'],
    queryFn: fetchRaceResults,
  });
}; 