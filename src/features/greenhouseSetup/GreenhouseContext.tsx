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
  const [greenhouse, setGreenhouse] = useState<GreenhouseData | null>(() => { //makes the greenhouse stay after refresh
    try {
      const user = localStorage.getItem('username');
      const saved = user ? localStorage.getItem(`greenhouse-${user}`) : null;
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

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
