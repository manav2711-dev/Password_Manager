// GlobalDataContext.tsx
import { Hospitals } from '@/types/Hospitals';
import { Patients } from '@/types/Patients';
import { Tournament } from '@/types/Tournament';
import React, { createContext, useContext, useState } from 'react';

type GlobalDataContextType = {
  selectedTournament?: Tournament;
  setSelectedTournament: (t: Tournament) => void;

  selectedHospital?: Hospitals;
  setSelectedHospital: (h: Hospitals) => void;

  selectedPatient?: Patients;
  setSelectedPatient: (p: Patients) => void;

  currentUserId: string;
  setCurrentUserId: (id: string) => void;

  registeredTournamentIds: number[];
  markAsRegistered: (id: number) => void;
  clearRegistrations: () => void;

  searchQuery: string;
  setSearchQuery: (q: string) => void;
};

const GlobalDataContext = createContext<GlobalDataContextType | null>(null);

export const GlobalDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedTournament, setSelectedTournament] = useState<Tournament | undefined>();
  const [selectedHospital, setSelectedHospital] = useState<Hospitals | undefined>();
  const [selectedPatient, setSelectedPatient] = useState<Patients | undefined>();
    const [currentUserId, setCurrentUserId] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
  const [userRegistrations, setUserRegistrations] = useState<Record<string, number[]>>({});

  const registeredTournamentIds = userRegistrations[currentUserId] || [];

//  const [registeredTournamentIds, setRegisteredTournamentIds] = useState<number[]>([]);

  const markAsRegistered = (id: number) => {
    setUserRegistrations((prev) => {
      const current = prev[currentUserId] || [];
      return {
        ...prev,
        [currentUserId]: [...new Set([...current, id])],
      };
    });
  };

  const clearRegistrations = () => {
    setUserRegistrations((prev) => ({
      ...prev,
      [currentUserId]: [],
    }));
  };

  return (
    <GlobalDataContext.Provider
      value={{
        selectedTournament,
        setSelectedTournament,
        selectedHospital,
        setSelectedHospital,
        selectedPatient,
        setSelectedPatient,
        currentUserId,
        setCurrentUserId,
        registeredTournamentIds,
        markAsRegistered,
        clearRegistrations,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
};

export const useGlobalData = () => {
  const context = useContext(GlobalDataContext);
  if (!context) {
    throw new Error('useGlobalData must be used within a GlobalDataProvider');
  }
  return context;
};