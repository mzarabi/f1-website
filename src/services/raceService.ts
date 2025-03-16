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

export interface Race {
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

interface RaceResponse {
  MRData: {
    RaceTable: {
      season: string;
      Races: Race[];
    };
  };
}

const API_BASE_URL = 'https://api.jolpi.ca/ergast/f1';

export const fetchRaces = async () => {
  const response = await fetch(`${API_BASE_URL}/2025/races/`);
  const data: RaceResponse = await response.json();
  return data.MRData.RaceTable.Races;
}; 