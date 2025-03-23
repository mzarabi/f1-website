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

export interface Driver {
  givenName: string;
  familyName: string;
  driverId: string;
}

export interface Constructor {
  constructorId: string;
  name: string;
}

export interface Result {
  position: string;
  Driver: Driver;
  Constructor: Constructor;
}

export interface RaceResult {
  season: string;
  round: string;
  raceName: string;
  Results: Result[];
}

interface RaceResultResponse {
  MRData: {
    RaceTable: {
      Races: RaceResult[];
    };
  };
}

const API_BASE_URL = 'https://api.jolpi.ca/ergast/f1';

export const fetchRaces = async () => {
  const response = await fetch(`${API_BASE_URL}/2025/races/`);
  const data: RaceResponse = await response.json();
  return data.MRData.RaceTable.Races;
};

export const fetchRaceResult = async (round: string): Promise<RaceResult | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/2025/${round}/results/`);
    const data: RaceResultResponse = await response.json();
    return data.MRData.RaceTable.Races[0] || null;
  } catch (error) {
    console.error('Error fetching race results:', error);
    return null;
  }
}; 