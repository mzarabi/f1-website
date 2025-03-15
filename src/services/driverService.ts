import { DriversResponse } from '../types/driver';
import { ConstructorStandingsResponse } from '../types/constructorStandings';

const API_BASE_URL = 'http://api.jolpi.ca/ergast/f1';

export const getDriverList = async () => {
  const response = await fetch(`${API_BASE_URL}/2025/drivers/`);
  const data: DriversResponse = await response.json();
  return data.MRData.DriverTable.Drivers;
};

export const getDriverStandings = async () => {
  const response = await fetch(`${API_BASE_URL}/2024/driverstandings/`);
  const data = await response.json();
  return data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
};

export const getConstructorStandings = async () => {
  const response = await fetch(`${API_BASE_URL}/2024/constructorstandings/`);
  const data: ConstructorStandingsResponse = await response.json();
  return data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
}; 