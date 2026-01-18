import Theme from "@/constants/theme";
import { useGlobalData } from "@/context/GlobalDataContext";
import { Ionicons } from "@expo/vector-icons";
import { useNavigationState } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export const CustomHeader = () => {
  const { searchQuery, setSearchQuery } = useGlobalData();
  const [isSearching, setIsSearching] = useState(false);
  const currentTab = useNavigationState(
    (state) => state.routes[state.index]?.name
  );

  const isSearchableTab = ["patients", "tournament", "events"].includes(currentTab);

  useEffect(() => {
    setIsSearching(false);
    setSearchQuery("");
  }, [currentTab]);


  const handleCancel = () => {
    setIsSearching(false);
    setSearchQuery(""); // Clear query
  };

  return (
    //  <LinearGradient
    //       colors={["#283542", "#255fdb"]}
    //       start={{ x: 0, y: 0 }}
    //       end={{ x: 1, y: 1 }}
    //       style={styles.container}
    //     >
    <View style={styles.container}>
      {isSearching && isSearchableTab ? (
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="gray" style={{ marginRight: 6 }} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={`Search ${currentTab}...`}
            placeholderTextColor="gray"
            style={styles.searchInput}
            autoFocus
          />
          <TouchableOpacity onPress={handleCancel}>
            <Ionicons name="close" size={20} color="gray" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.titleRow}>
          <View style={{ flex:1 }} />
          <Text style={styles.title}>Passico</Text>
          {isSearchableTab ? (
            <TouchableOpacity
              onPress={() => setIsSearching(true)}
              style={{ flex: 1, alignItems: "flex-end" }}
            >
              <Ionicons name="search" size={22} color="black" />
            </TouchableOpacity>
          ) : (
            <View style={{ flex: 1 }} /> 
          )}
        </View>
      )}
    </View>
    // </LinearGradient>
  );
};


const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16,
    alignItems:"center",
    paddingTop: 50,
    paddingBottom:16,
    backgroundColor: Theme.colors.primary,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
     backgroundColor:Theme.colors.primary,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color:"white",
    flex: 2,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    paddingHorizontal: 10,
    // paddingVertical:2
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 6,
    color: "black",
  },
});
