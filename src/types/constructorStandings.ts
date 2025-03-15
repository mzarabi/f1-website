interface Constructor {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
}

export interface ConstructorStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Constructor: Constructor;
}

export interface ConstructorStandingsResponse {
  MRData: {
    StandingsTable: {
      StandingsLists: Array<{
        season: string;
        round: string;
        ConstructorStandings: ConstructorStanding[];
      }>;
    };
  };
} 