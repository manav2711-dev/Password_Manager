// utils/navigation.ts
import { useGlobalData } from "@/context/GlobalDataContext";
import { Tournament } from "@/types/Tournament";
import { useRouter } from "expo-router";

export const useNavigateToTournamentForm = () => {
  const router = useRouter();
  const { setSelectedTournament } = useGlobalData();

  return (tournament: Tournament) => {
    setSelectedTournament(tournament);
 
    switch (tournament.event_type) {  //navigate to the tournament on the basis of event id
      case 1:
        router.push("/tregister/cricket");
        break;
      case 2:
        router.push("/tregister/hockey");
        break;
      case 3:
        router.push("/tregister/football");
        break;
      default:
        router.push("/tournament");
    }
  };
};
