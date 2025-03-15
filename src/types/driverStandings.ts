interface Constructor {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
}

interface Driver {
  driverId: string;
  permanentNumber: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
}

export interface DriverStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Driver: Driver;
  Constructors: Constructor[];
}

export interface DriverStandingsResponse {
  MRData: {
    StandingsTable: {
      StandingsLists: Array<{
        season: string;
        round: string;
        DriverStandings: DriverStanding[];
      }>;
    };
  };
} 