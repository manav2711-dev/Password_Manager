import { formatDate } from "@/lib/date-utils";
import { Diagnosis } from "@/types/Diagnosis";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function DiagnosisCard({
  diagnosis,
  onView,
  onFeedback,
}: {
  diagnosis: Diagnosis;
  onView: () => void;
  onFeedback: () => void;
}) {
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.cardHeader}>
        <View style={styles.leftSection}>
          <Ionicons name="medkit" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.heading}>{diagnosis.problem}</Text>
        </View>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.subText}>🩺 Doctor: {diagnosis.doctor}</Text>
        <Text style={styles.subText}>📅 Date: {formatDate(diagnosis.date)}</Text>
        {
          diagnosis.problemDesc?(
            <Text style={styles.subText}>📝 Summary: {diagnosis.problemDesc}</Text>
          ):(<></>)
        }

        <View style={styles.buttonColumn}>
          <TouchableOpacity style={styles.outlinedButton} onPress={onView}>
            <Text style={styles.outlinedButtonText}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filledButton} onPress={onFeedback}>
            <Text style={styles.filledButtonText}>Feedback</Text>
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
    justifyContent: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#38ada9",
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
    padding: 16,
    backgroundColor: "#fff",
  },
  subText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
  },
  buttonColumn: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  outlinedButton: {
    borderWidth: 1,
    borderColor: "#38ada9",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  outlinedButtonText: {
    color: "#38ada9",
    fontWeight: "600",
  },
  filledButton: {
    backgroundColor: "#38ada9",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  filledButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
