import { getTournaments } from "@/api/apis";
import TournamentCard from "@/components/TournamentCard"; // Create this component
import { useGlobalData } from "@/context/GlobalDataContext";
import { getTournamentDetails, saveTournamentDetails } from "@/lib/storage";
import { isEvent } from "@/lib/utils";
import { activityTypeMap } from "@/styles/gameMetaData";
import { Tournament } from "@/types/Tournament";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, View } from "react-native";
import { Text } from "react-native-paper";

export default function TournamentListScreen() {
  const [events, setEvents] = useState<Tournament[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const {searchQuery } = useGlobalData();

    const filteredEvents = events?.filter((e) => {
      const nameMatch = e.name?.toLowerCase().includes(searchQuery.toLowerCase());
      const eventTypeName = activityTypeMap[e.event_type]?.name?.toLowerCase() || "";
      const typeMatch = eventTypeName.includes(searchQuery.toLowerCase());
    
      return nameMatch || typeMatch;
    });
    
    const fetchEvents = async (Refresh=false) => {
    try {
      let res:Tournament[];
      if(!Refresh){
        const savedData: Tournament[]|null = await getTournamentDetails();
        if(savedData && savedData.length>0){
          res =savedData;
        }else{
         res = await getTournaments(); 
          await saveTournamentDetails(res);//make api call for tournaments
        }
      }else{
        res= await getTournaments();
        await saveTournamentDetails(res);
      }
      setEvents((res as Tournament[]).filter((e) => isEvent(e.event_type))); // filter the list if it is a event or tournament
    } catch (err) {
      console.log("Error fetching Events:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEvents();  
  }, []);

  const onRefresh = useCallback(() => {  //on reload make api call again
    setRefreshing(true);
    fetchEvents(true);
  }, []);


  return (
    <View style={{ padding: 16, flex: 1, justifyContent: "center" }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : events && events.length > 0 ? (
        <FlatList
          data={filteredEvents}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <TournamentCard tournament={item} />}  //tournament card
           refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <Text>No Events available</Text>
      )}
    </View>
  );
}
