import { createContext, useContext, useState, ReactNode } from 'react';

type GreenhouseData = {
  greenhouseName: string;
  plantType: string;
  plantSpecies: string;
  plantingDate: string;
  growthStage: string;
};

type GreenhouseContextType = {
  greenhouse: GreenhouseData | null;
  setGreenhouse: (data: GreenhouseData) => void;
};

const GreenhouseContext = createContext<GreenhouseContextType | undefined>(undefined);

export const GreenhouseProvider = ({ children }: { children: ReactNode }) => {
  const [greenhouse, setGreenhouse] = useState<GreenhouseData | null>(null);

  return (
    <GreenhouseContext.Provider value={{ greenhouse, setGreenhouse }}>
      {children}
    </GreenhouseContext.Provider>
  );
};

export const useGreenhouse = (): GreenhouseContextType => {
  const context = useContext(GreenhouseContext);
  if (!context) {
    throw new Error('useGreenhouse must be used within a GreenhouseProvider');
  }
  return context;
};
