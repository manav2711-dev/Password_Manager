import { Hospitals } from "@/types/Hospitals";
import React, { createContext, useContext, useState } from "react";


interface HospitalContextType {
  selectedHospital: Hospitals | null;
  setSelectedHospital: (hospital: Hospitals) => void;
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined);

export const HospitalProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedHospital, setSelectedHospital] = useState<Hospitals | null>(null);

  return (
    <HospitalContext.Provider value={{ selectedHospital, setSelectedHospital }}>
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospital = () => {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error("useHospital must be used within a HospitalProvider");
  }
  return context;
};
