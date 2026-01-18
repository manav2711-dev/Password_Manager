import { getPasswords } from "@/api/apis";
import TournamentCard from "@/components/TournamentCard"; // Create this component
import { useGlobalData } from "@/context/GlobalDataContext";
import { getUserDetails } from "@/lib/storage";
import { Passwords } from "@/types/Passwords";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, View } from "react-native";
import { Text } from "react-native-paper";

export default function TournamentListScreen() {
  const [passwords, setPasswords] = useState<Passwords[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const {searchQuery } = useGlobalData();
    
    const fetchPasswords = async (Refresh=false) => {
    try {
      const user = await getUserDetails();
      console.log("saved user",user)
      let res:Passwords[];
      if(!Refresh){
         res = await getPasswords(user.id); 
      }else{
        res= await getPasswords(user.id);
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
    fetchPasswords();  
  }, []);

  const onRefresh = useCallback(() => {  //on reload make api call again
    setRefreshing(true);
    fetchPasswords(true);
  }, []);


  return (
    <View style={{ padding: 16, flex: 1, justifyContent: "center" }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : passwords && passwords.length > 0 ? (
        <FlatList
          data={passwords}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <TournamentCard password={item}/>}  //tournament card
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
