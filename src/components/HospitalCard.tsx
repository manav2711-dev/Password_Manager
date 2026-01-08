import { Hospitals } from "@/types/Hospitals";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HospitalCard({
  hospital,
  onPress,
}: {
  hospital: Hospitals;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardWrapper}>
      <View style={styles.cardHeader}>
        <View style={styles.leftSection}>
          <Ionicons name="medkit" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.hospitalName}>{hospital.typeStyleValue}</Text>
        </View>
      </View>

        <Image
          source={{ uri: hospital.oldName}}
          style={styles.image}
          resizeMode="contain"
          />

      <View style={styles.cardBody}>
        {/* <Text style={styles.subText}>🏥 Type: {hospital.typeStyleValue || "N/A"}</Text> */}
        <Text style={styles.subText}>📞 Phone: {hospital.emailId || "Not available"}</Text>
        <Text style={styles.subText}>📍 Address: {hospital.imgPath || "Not available"}</Text>
      </View>
    </TouchableOpacity>
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
    justifyContent: "flex-start",
    paddingHorizontal: 12,
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
  hospitalName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
     height: 95,
  // aspectRatio: 30 / 9, 
    borderRadius: 0,
  },
  cardBody: {
    padding: 16,
    backgroundColor: "#fff",
  },
  subText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
  },
});
