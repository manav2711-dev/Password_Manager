import { getPasswords } from "@/api/apis";
import TournamentCard from "@/components/TournamentCard"; // Create this component
import { useGlobalData } from "@/context/GlobalDataContext";
import { Passwords } from "@/types/passwords";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, View } from "react-native";
import { Text } from "react-native-paper";

export default function TournamentListScreen() {
  const [passwords, setPasswords] = useState<Passwords[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const {searchQuery } = useGlobalData();
  const userId = "695bf338dfd98afe1b2dcc18"

    // const filteredEvents = events?.filter((e) => {
    //   const nameMatch = e.name?.toLowerCase().includes(searchQuery.toLowerCase());
    //   const eventTypeName = activityTypeMap[e.event_type]?.name?.toLowerCase() || "";
    //   const typeMatch = eventTypeName.includes(searchQuery.toLowerCase());
    
    //   return nameMatch || typeMatch;
    // });
    
    const fetchEvents = async (Refresh=false) => {
    try {
      let res:Passwords[];
      if(!Refresh){
        // const savedData: Passwords[]|null = await getTournamentDetails();
        // if(savedData && savedData.length>0){
        //   res =savedData;
        // }else{
         res = await getPasswords(userId); 
          // await saveTournamentDetails(res);//make api call for tournaments
        // }
      }else{
        res= await getPasswords(userId);
        // await saveTournamentDetails(res);
      }
      setPasswords((res as Passwords[])); // filter the list if it is a event or tournament
    } catch (err) {
      console.log("Error fetching Passwords:", err);
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
      ) : passwords && passwords.length > 0 ? (
        <FlatList
          data={passwords}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <TournamentCard password={item} />}  //tournament card
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
