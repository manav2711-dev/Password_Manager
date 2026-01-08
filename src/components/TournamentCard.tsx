
import { getAttributeDetails, tournamentRegister } from "@/api/apis";
import DescriptionModal from "@/components/DescriptionDialog";
import { useDialog } from "@/context/DialogContext";
import { useGlobalData } from "@/context/GlobalDataContext";
import { formatDate } from "@/lib/date-utils";
import { useNavigateToTournamentForm } from "@/lib/navigationutils";
import { getPersonalDetails, saveItemAttributes } from "@/lib/storage";
import { getCityById, getStatusInfo, isEvent, openInMaps } from "@/lib/utils";
import { activityTypeMap } from "@/styles/gameMetaData";
import { ItemAttributes } from "@/types/ItemAttributes";
import { Tournament } from "@/types/Tournament";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";


function getCountdown(startDate: Date): string {
  const now = new Date();
  const start = new Date(startDate);
  const diff = start.getTime() - now.getTime();

  if (diff <= 0) return "Started";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

  return `${days}d : ${hours}h`;
}

export default function TournamentCard({ tournament }: { tournament: Tournament }) {
  const [cityName, setCityName] = useState("");
  const countdown = getCountdown(tournament.start_date);
  const navigateToForm = useNavigateToTournamentForm(); 
  const registrationDate = tournament.reg_date ? new Date(tournament.reg_date) : new Date();
  const activity = activityTypeMap[tournament.event_type];
  const {registeredTournamentIds,markAsRegistered} = useGlobalData();
  const isRegistered = Boolean(tournament.reg_date) || registeredTournamentIds.includes(tournament.id);
  const [showDescription, setShowDescription] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const { showConfirmDialog } = useDialog();
  
const handleDescriptionOpen = () => setShowDescription(true);
const handleDescriptionClose = () => setShowDescription(false);


  
   const handleSubmit = async () => {
      if(isEvent(tournament.event_type)){
        handleEvent();
      }else{
        handleTournament();
      }
  };

   const handleEvent = async() =>{  //call to send event registration without form
    const confirm = await showConfirmDialog("Are you sure you want to register?");
    if(confirm){ 
      setIsSubmitting(true);
     try {
        const person = await getPersonalDetails();
        const attributes:ItemAttributes[] = [];
    
        const res = await tournamentRegister(
          tournament.id,
          tournament.event_type,
          person!.id,
          attributes,
        );
        console.log("Registration success:", res);
        markAsRegistered(tournament.id);
        Alert.alert("Success", "Registered Event Successfully!");
        // router.replace(Route.TOURNAMENT);
      } catch (error) {
        console.error("Error submitting registration:", error);
        Alert.alert("Error", "Failed to submit registration.");
      }finally{
        setIsSubmitting(false);
      }
    }
   }

   const handleTournament = async() =>{ 
    if(isSubmitting) return;
    setIsSubmitting(true); // call to send tournament registration with form
    try{
     const res = await getAttributeDetails(
      tournament.event_type,
      );
      if(!res || res.length===0){
        Alert.alert("OOPS! Form Not Found", "Try after sometime.");
        return;
      }
      saveItemAttributes(res);
      console.log("Attribute success:", res);
        navigateToForm(tournament)
    } catch (error) {
      console.error("Error submitting registration:", error);
      Alert.alert("Error", "Failed to submit registration.");
    }
    finally{
      setIsSubmitting(false);
    }
   }
  
  useEffect(() => {
    const fetchCityName = async () => {
      const city = await getCityById(tournament.city_id);
      setCityName(city.name);
    };
    fetchCityName();
  }, [tournament.city_id]);

  return (
    <View style={styles.cardWrapper}>
      <View style={[styles.cardHeader, { backgroundColor: activity?.color || "#333" }]}>
    
    {/* Activity on the left */}
    {activity && (
      <View style={styles.leftSection}>
        <Text style={styles.activityIcon}>{activity.icon}</Text>
        <Text style={styles.activityName}>{activity.name}</Text>
      </View>
    )}

    {/* Centered Tournament Name */}
    <View style={styles.centerSection}>
      <Text style={styles.headerText}>{tournament.name}</Text>
    </View>

    <TouchableOpacity onPress={() => openInMaps(tournament.latitude, tournament.longitude)} style={styles.mapButton}>
    <Ionicons name="location-sharp" size={24} color="#d9534f" />
</TouchableOpacity>

     {/* Right Section: Info Button */}
  <TouchableOpacity onPress={handleDescriptionOpen} style={styles.infoButton}>
    <Text style={styles.infoIcon}>ℹ️</Text>
  </TouchableOpacity>
    
  </View>


      <View style={styles.cardBody}>
        <View style={{ flex: 1 }}>
          {activity && (
            <View style={styles.activityRow}>
              {/* <Text style={styles.activityIcon}>{activity.icon}</Text> */}
              {/* <Text style={styles.activityName}>{activity.name}</Text> */}
            </View>
          )}
          <Text style={styles.subText}>📍 City: {cityName}</Text>
          <Text style={styles.subText}>
            🗓 {formatDate(tournament.start_date)} -{" "}
            {formatDate(tournament.end_date)}
          </Text>
          

    {isRegistered && (() => {
  const { text, color } = getStatusInfo(tournament.reg_status);
  const iconName = "checkmark-circle"; // use different icons if needed
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Ionicons name={iconName} size={18} color={color} style={{ marginRight: 4 }} />
      <Text style={styles.subText}>
        Registered on:{formatDate(registrationDate)} (Status:{text})
      </Text>
    </View>
  );
})()}

  </View>

        <View style={styles.rightBox}>
          <Text style={styles.countdownText}>⏳ {countdown}</Text>

   <TouchableOpacity
  onPress={handleSubmit}
  disabled={isRegistered || isSubmitting}
  style={[
    styles.registerButton,
    {
      backgroundColor: isRegistered ? "#ccc" : activity?.color || "#2e86de",
      opacity: isRegistered ? 1 : 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  ]}
>
  {isSubmitting ? (
    <ActivityIndicator size="small" color="#fff" />
  ) : (
    <Text style={styles.registerButtonText}>
      {isRegistered ? "Registered" : "Register"}
    </Text>
  )}
</TouchableOpacity>

        </View>
      </View>

      <DescriptionModal
  visible={showDescription}
  onClose={handleDescriptionClose}
  // description="" 
  description={tournament.type_remarks}/>
    </View>  
  );
}

// export const getString=(des:string):string=>{
//   let str = "";
// for (let index = 0; index < 250; index++) {
//   str+=des;
// }
// return str;
// }

const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: 16,
    marginVertical: 12,
    backgroundColor: "#f8f9fa",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 3,
    overflow: "hidden",
  },
  cardBody: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  rightBox: {
    justifyContent: "center",
    alignItems: "flex-end",
    marginLeft: 16,
  },
  countdownText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#d9534f",
    marginBottom: 8,
  },
  registerButton: {
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 8,
  marginTop: 6,
  alignItems: "center",
},
registerButtonText: {
  color: "#fff",
  fontSize: 14,
  fontWeight: "600",
},

activityIcon: {
  marginRight: 4,
  fontSize: 20,
},

activityName: {
  color: '#fff',
  fontSize: 16,
  fontWeight:'bold',
},

headerText: {
  color: '#fff',
  fontSize: 20,
  fontWeight: 'bold',
},

infoIcon: {
  fontSize: 18,
  color: '#fff',
},


cardHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 10,
  minHeight: 50,
  // flexWrap: 'wrap',
  backgroundColor: '#333', // fallback if no activity.color
},

leftSection: {
  flexDirection: 'row',
  alignItems: 'center',
  flexShrink: 1,
},

centerSection: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  // paddingHorizontal: 5,
},

mapButton: {
  padding: 2,
  // marginRight: 2,
},

infoButton: {
  padding: 6,
},


});
