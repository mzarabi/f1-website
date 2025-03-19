import { ConstructorsResponse } from '../types/constructor';

const API_BASE_URL = 'https://api.jolpi.ca/ergast/f1';

export const getConstructorList = async () => {
  const response = await fetch(`${API_BASE_URL}/2025/constructors/`);
  const data: ConstructorsResponse = await response.json();
  return data.MRData.ConstructorTable.Constructors;
}; 