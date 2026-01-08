// // PatientCard.tsx
// import { Patients } from "@/types/Patients";
// import { Ionicons } from "@expo/vector-icons";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// export default function PatientCard({patient,onPress,}
//     :{
//   patient: Patients;
//   onPress: () => void;
//   }) {
//    return (
//     <TouchableOpacity onPress={onPress} style={styles.cardWrapper}>
//       <View style={styles.cardHeader}>
//         <View style={styles.leftSection}>
//           <Ionicons name="person" size={20} color="#fff" style={styles.icon} />
//           <Text style={styles.heading}>{patient.name}</Text>
//         </View>
//       </View>
//       <View style={styles.cardBody}>
//            <Text style={styles.subText}>📱 Mobile: {patient.mobile || "N/A"}</Text>
//         <Text style={styles.subText}>🚻 Gender: {patient.male || "N/A"}</Text>
//         <Text style={styles.subText}>🩸 Blood Group: {patient.bloodGroup || "N/A"}</Text>
//         <Text style={styles.subText}>🏥 Address: {patient.address || "N/A"}</Text>
//         <Text style={styles.subText}>📝 Admission No: {patient.adminss_no || "N/A"}</Text>
//       </View>
//     </TouchableOpacity>
//   );
// }


// const styles = StyleSheet.create({
//   cardWrapper: {
//     borderRadius: 20,
//     marginVertical: 8,
//     backgroundColor: "#f8f9fa",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.1,
//     shadowRadius: 20,
//     elevation: 2,
//     overflow: "hidden",
//   },
//   cardHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "flex-start",
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//     backgroundColor: "#2e86de",
//   },
//   leftSection: {
//     flexDirection: "row",
//     alignItems: "center",
//     flexShrink: 1,
//   },
//   icon: {
//     marginRight: 8,
//   },
//   heading: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   image: {
//     width: "100%",
//     height: 120,
//     borderRadius: 0,
//   },
//   cardBody: {
//     padding: 16,
//     backgroundColor: "#fff",
//   },
//   subText: {
//     fontSize: 14,
//     color: "#555",
//     marginBottom: 6,
//   },
// });

import { Patients } from "@/types/Patients";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PatientCard({
  patient,
  onView,
  onNewAppointment,
  onEdit,
}: {
  patient: Patients;
  onView: () => void;
  onNewAppointment: () => void;
  onEdit: () => void;
}) {
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.cardHeader}>
        <View style={styles.leftSection}>
          <Ionicons name="medkit" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.heading}>{patient.name}</Text>
        </View>
        <TouchableOpacity onPress={onEdit}>
          <Ionicons name="pencil" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.detailsSection}>
          <Text style={styles.subText}>📱 M: {patient.mobile || "N/A"}</Text>
          <Text style={styles.subText}>🚻 Gender: {patient.male || "N/A"}</Text>
          <Text style={styles.subText}>🩸 Blood Group: {patient.bloodGroup || "N/A"}</Text>
          <Text style={styles.subText}>🏥 Address: {patient.address || "N/A"}</Text>
          <Text style={styles.subText}>📝 Admission No: {patient.adminss_no || "N/A"}</Text>
        </View>

        <View style={styles.buttonColumn}>
          <TouchableOpacity style={styles.outlinedButton} onPress={onView}>
            <Text style={styles.outlinedButtonText}>View Diagnosis</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filledButton} onPress={onNewAppointment}>
            <Text style={styles.filledButtonText}>New Appointment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: 20,
    marginVertical: 8,
    backgroundColor: "#f8f9fa",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 2,
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#2e86de",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  icon: {
    marginRight: 8,
  },
  heading: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"stretch",
    padding: 16,
    backgroundColor: "#fff",
  },
  detailsSection: {
    flex: 1,
    paddingRight: 10,
  },
  subText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
  },
  buttonColumn: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  outlinedButton: {
    borderWidth: 1,
    borderColor: "#2e86de",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 8,
    minWidth: 100,
  },
  outlinedButtonText: {
    color: "#2e86de",
    fontWeight: "600",
    textAlign: "center",
  },
  filledButton: {
    backgroundColor:"#2e86de",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    minWidth: 100,
  },
  filledButtonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
});
