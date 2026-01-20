import { CustomHeader } from "@/components/Header";
import Theme from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";

const PaperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Theme.colors.primary,
    background: Theme.colors.background,
    text: Theme.colors.text,
  },
};

export default function TabLayout() {
  
  //tabs layout
  return (
    <PaperProvider theme={PaperTheme}>
      <Tabs
        screenOptions={{
          headerShown: true,
          header: () => <CustomHeader/>,
          headerTitleAlign: "center",
          tabBarActiveTintColor: Theme.colors.primary,
          tabBarLabelStyle: {
            fontSize: Theme.typography.extraSmall,
            fontWeight: Theme.typography.fontWeight.medium,
          },
          tabBarStyle: {
            paddingBottom: 10,
            height: 60,
            elevation:0,
          },
        }}>
          {/* <Tabs.Screen
          name="work"
          options={{
            title: "Add Work",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name={Theme.icons.add}
                size={size}
                color={color}
              />
            ),
          }}
        /> */}
           {/* <Tabs.Screen
          name="patients"
          options={{
            title: "Patients",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name={Theme.icons.Patients}
                size={size}
                color={color}
              />
            ),
          }}
        /> */}

        {/* <Tabs.Screen
          name="tournament"
          options={{
            title: "Tournaments",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name={Theme.icons.tournament}
                size={size}
                color={color}
              />
            ),
          }}
        /> */}
         
            <Tabs.Screen
          name="passwords"
          options={{
            title: "Passwords",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name={Theme.icons.pass}
                size={size}
                color={color}
              />
            ),
          }}
        />
        
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name={Theme.icons.ProfileNavBar}
                size={size}
                color={color}
              />
            ),
          }}
        />
        
        {/* <Tabs.Screen
          name="details"
          options={{
            href: null, // <-- This hides it from the tab bar
          }}
        /> */}
      </Tabs>
    </PaperProvider>
  );
}


const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 2,
    color: "black",
  },
});
