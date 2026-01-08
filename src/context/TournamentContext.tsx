//src/context/TournamentContext.tsx
import { defaultTournament, Tournament } from "@/types/Tournament";
import React, { createContext, ReactNode, useContext, useState } from "react";

// Define the shape of the context's data and updater function
type TournamentContextType = {
  selectedTournament: Tournament | null; // Currently selected tournament
  setSelectedTournament: (t: Tournament) => void; // Function to update selected tournament
   registeredTournamentIds: number[];
  markAsRegistered: (id: number) => void;
};

const TournamentContext = createContext<TournamentContextType | undefined>(undefined);
// Provider component to wrap parts of the app that need access to the tournament context
export const TournamentProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTournament, setSelectedTournament] = useState<Tournament>(defaultTournament);// Provide the selected tournament 
  const [registeredTournamentIds, setRegisteredTournamentIds] = useState<number[]>([]);
  const markAsRegistered = (id: number) => {
    setRegisteredTournamentIds((prev) => [...new Set([...prev, id])]);
  };

  
  return (
    <TournamentContext.Provider value={{ 
      selectedTournament, 
      setSelectedTournament,
      registeredTournamentIds,
      markAsRegistered 
      }}>
      {children}
    </TournamentContext.Provider>
  );
};

// Custom hook to access the tournament context in functional components
export const useTournament = () => {
  const context = useContext(TournamentContext);
  // Throw an error if the hook is used outside the provider
  if (!context) {
    throw new Error("useTournament must be used within a TournamentProvider");
  }
  return context;
};
