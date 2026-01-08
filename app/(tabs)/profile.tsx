import { Route } from "@/constants/router";
import Theme from "@/constants/theme";
import { useDialog } from "@/context/DialogContext";
import { useGlobalData } from "@/context/GlobalDataContext";
import { useToast } from "@/context/ToastContext";
import { easterEgg } from "@/lib/fun-animation";
import { getPhoneNo, resetSecureStorageWithLogs, secureStorageGetItem } from "@/lib/storage";
import { SECURE_STORE_KEYS } from "@/lib/storageKeys";
import { SettingItem } from "@/types/SettingItem";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Avatar, List, Text } from "react-native-paper";


export default function ProfileScreen() {
  const [displayName, setDisplayName] = useState("");
  const { showConfirmDialog } = useDialog();
  const { showSuccessToast } = useToast();
  // const [details, setDetails] = useState<PersonalDetail| null>(null);
  const [details, setDetails] = useState<any>(null);
  const { setCurrentUserId, clearRegistrations } = useGlobalData();
  


  const handleChangeMobileNo = () => {   //method to change mobile number
    showConfirmDialog("Are you sure you want to logout?").then((confirm) => {
      if (confirm) {
        resetSecureStorageWithLogs();
        setCurrentUserId("");           
        clearRegistrations();        
        showSuccessToast("You have been logged out.");
        router.replace(Route.LOGIN)  //route to register page
      }
    });
  };

  // const handleLogout = () => {
  //   showConfirmDialog("Are you sure you want to logout?").then((confirm) => {
  //     if (confirm) {
  //       resetSecureStorageWithLogs();
  //       showSuccessToast("You have been logged out.");
  //       router.replace("/login")
  //     }
  //   });
  // };

  //  const handleDetails = () => { 
  //  router.push(Route.DETAILS) ,  //route to details page
  // };

//   const handleDetails = () => {
//   router.push({
//     pathname: "/screens/details",
//     params: { fromTab: 'profile' },
//   });
// };
  const handleNamePress = () => {
    setDisplayName(easterEgg());
    // restore original name after delay
    setTimeout(() => {
      setDisplayName("Vishal Kumar");
    }, 1000);
  };

  const settings: SettingItem[] = [
    
    {
      id: "1",
      title: "Personal Details",
      icon: Theme.icons.document,
      // onPress: () => handleDetails(),
    },
  
    // {
    //   id: "2",
    //   title: "Print Logs",
    //   icon: Theme.icons.document,
    //   onPress: () => secureStorageLogs(),
    // },
     {
      id: "3",
      title: "Logout",
      icon: Theme.icons.logout,
      onPress: () => handleChangeMobileNo(),
    },
  ];

  useEffect(() => {
      const loadProfile = async () => {
        const userDetail =  {
          username : await secureStorageGetItem(SECURE_STORE_KEYS.USERNAME),
          mobile : await getPhoneNo()
        }
        console.log("user",userDetail);
        // const Profiledetails = await getPersonalDetails();  //load presonal details from storage and set in state
        setDetails(userDetail);                 
      };
      loadProfile();
    }, []);
  

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        {
        // details?.image ? (
        //     <Avatar.Image
        //       size={80}
        //       source={{ uri: details.image }}
        //       style={styles.avatar}
        //     />
        //   ) : 
          (
            <Avatar.Icon
              size={80}
              icon={Theme.icons.ProfileAvatar}
              style={styles.avatar}
            />
          )
        }
        <View style={styles.infoBlock}>
          <Text onPress={handleNamePress} style={styles.name}>
            {details?.username}
          </Text>
          <Text style={styles.phone}>
            {details?.mobile}
            </Text>
        </View>
      </View>

      {/* Settings List */}
      <FlatList
        data={settings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <List.Item
            title={item.title}
            left={(props) => <List.Icon {...props} icon={item.icon} />}
            onPress={item.onPress}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    padding: Theme.spacing.md,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Theme.spacing.lg,
  },
  avatar: {
    backgroundColor: Theme.colors.primary,
  },
  infoBlock: {
    marginLeft: Theme.spacing.md,
    flex: 1,
  },
  name: {
    fontSize: Theme.typography.heading,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.text,
  },
  phone: {
    fontSize: Theme.typography.body,
    color: Theme.colors.muted,
    marginTop: Theme.spacing.xs,
  },
  listContainer: {
    paddingBottom: Theme.spacing.xl,
  },
});
