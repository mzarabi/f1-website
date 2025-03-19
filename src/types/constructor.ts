interface Constructor {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
}

export interface ConstructorsResponse {
  MRData: {
    ConstructorTable: {
      Constructors: Constructor[];
    };
  };
}

export type { Constructor }; 