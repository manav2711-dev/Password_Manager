
import Theme from "@/constants/theme";
import { getUserDetails } from "@/lib/storage";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { List } from "react-native-paper";

export default function ProfileScreen() {
  const [details, setDetails] = useState<any | null>(null);
 
  //load profiledetails from storage  
  useEffect(() => {
    const loadProfile = async () => {
      const profileDetails = await getUserDetails();
      setDetails(profileDetails);
    };
    loadProfile();
  }, []);

  const profileItems = [
    {
      title: "Name",
      description: details?.name ?? "N/A",
      icon: Theme.icons.person,
    },
    {
      title: "Phone No",
      description: details?.phone ?? "N/A",
      icon: Theme.icons.phone,
    },
      {
      title: "Email",
      description: details?.email ?? "N/A",
      icon: Theme.icons.mail,
    },
    // {
    //   title: "Date of Birth",
    //   description: details?.dob ? formatDate(details.dob) : "N/A",
    //   icon: Theme.icons.calender,
    // },
    // {
    //   title: "Gender",
    //   description: details?.male ?? "N/A",
    //   icon: Theme.icons.person,
    // },
    // {
    //   title: "Qualification",
    //   description: OccupationMap[details?.qualificationId as OccupationCode]  ?? "N/A",
    //   icon: Theme.icons.qualification,
    // },
    // {
    //   title: "Blood Group",
    //   description: details?.bloodGroup ?? "N/A",
    //   icon: Theme.icons.blood,
    // },
    // {
    //   title: "Aadhar No",
    //   description: details?.adminss_no ?? "N/A",
    //   icon: Theme.icons.aadhar,
    // },
    // {
    //   title: "Address",
    //   description:`${details?.address ?? "N/A"}, ${details?.city?.name ?? "N/A"}`,
    //   icon: Theme.icons.location,
    // },
    //  {
    //   title: "city",
    //   description: details?.city.name,
    //   icon: "map-marker",
    // },
  ];

return (
  <ScrollView contentContainerStyle={styles.container}>
    {/* Personal Details List */}
    <List.Section>
      {profileItems.map((item, index) => (
        <List.Item
          key={index}
          title={item.title}
          description={item.description}
          left={(props) => <List.Icon {...props} icon={item.icon} />}
        />
      ))}
    </List.Section>

    {/* <TouchableOpacity style={styles.button} onPress={() => router.push(Route.PERSONAL_DETAILS)}>
      <Text style={styles.buttonText}>Edit</Text>
    </TouchableOpacity> */}
  </ScrollView>
);

}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Theme.colors.background,
    padding: Theme.spacing.sm,
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
   button: {
    width: '100%',
    backgroundColor: 'red',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  phone: {
    fontSize: Theme.typography.body,
    color: Theme.colors.muted,
    marginTop: Theme.spacing.xs,
  },
});
