import Colors from "@/constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text } from "react-native";

export function GradientButton({ label, onPress }: any) {
  return (
    <Pressable onPress={onPress}>
      <LinearGradient
        colors={Colors.primaryGradient.colors}
        start={Colors.primaryGradient.start}
        end={Colors.primaryGradient.end}
        style={styles.gradientButton}
      >
        <Text style={styles.gradientButtonText}>{label}</Text>
      </LinearGradient>
    </Pressable>
  );
}


const styles = StyleSheet.create({
  gradientButton: {
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 24,
    marginLeft: 8,
  },
  gradientButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
  },
});