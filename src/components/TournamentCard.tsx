import { decryptPassword } from "@/api/apis";
import { Route } from "@/constants/router";
import { useDialog } from "@/context/DialogContext";
import { useNavigateToTournamentForm } from "@/lib/navigationutils";
import { Passwords } from "@/types/Passwords";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function getCountdown(startDate: Date): string {
  const now = new Date();
  const start = new Date(startDate);
  const diff = start.getTime() - now.getTime();

  if (diff <= 0) return "Started";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

  return `${days}d : ${hours}h`;
}

export default function TournamentCard({ password}: { password: Passwords}) {
  const navigateToForm = useNavigateToTournamentForm(); 
  const [showDescription, setShowDescription] = useState(false);
    const [loading, setLoading] = useState(false);
   const { showConfirmDialog } = useDialog();
   const [visible, setVisible] = useState(false);
  const [decrypted, setDecrypted] = useState<string>("••••••••");

   const handleEvent = async() =>{
     try {
        const res = await decryptPassword(password._id);
        return res
      } catch (error : any) {
        console.error("Error submitting passowrd:", error);
          if (error?.response?.status === 401) {
          Alert.alert(
            "Session Expired",
            error?.response?.data?.message || "Something went wrong"
          );
           router.replace(Route.LOGIN);
        } else {
        Alert.alert(
        "Error",
        error?.response?.data?.message || "Something went wrong"
    );
    router.replace(Route.LOGIN);
  }
  // throw error;
      }
   }

    const handleToggle = async () => {
      try {
        setLoading(true);
         if (!visible) {
      const plain = await handleEvent();
      setDecrypted(plain);
    } else {
      setDecrypted("••••••••");
    }
    setVisible(!visible);
      } catch {
      Alert.alert("Error", "Failed to decrypt password");
    } finally {
      setLoading(false);
    }
  };

  
  const handleCopy = async () => {
    if (!visible) {
      Alert.alert("Hidden Password", "Reveal password before copying");
      return;
    }

    await Clipboard.setStringAsync(decrypted);
    Alert.alert("Copied", "Password copied to clipboard");

    // Auto-clear clipboard after 20 seconds (security)
    setTimeout(() => {
      Clipboard.setStringAsync("");
    }, 20000);
  };

 return (
    <LinearGradient
      colors={["#283542", "#255fdb"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.appName}>{password.name}</Text>

       <View style={styles.iconRow}>
          {/* Copy */}
          <TouchableOpacity onPress={handleCopy} disabled={visible}>
            <Ionicons
              name="copy-outline"
              size={20}
              color={"#e5e7eb"}
            />
          </TouchableOpacity>

          {/* Eye */}
          <TouchableOpacity onPress={handleToggle} style={{ marginLeft: 14 }}>
            <Ionicons
              name={visible ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#e5e7eb"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Username */}
      {/* <Text style={styles.label}>Username</Text>
      <Text style={styles.value}>{password.username}</Text> */}

      {/* Password */}
      <Text style={[styles.label, { marginTop: 10 }]}>Password</Text>
      <Text style={styles.password}>{decrypted}</Text>

      {/* Footer */}
      <Text style={styles.id}>ID: {password._id}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 16,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  appName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#f9fafb",
  },

  label: {
    fontSize: 12,
    color: "#d0d5de",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
   iconRow: {
    flexDirection: "row",
    alignItems: "center",
    color: "#d0d5de",
  },

  value: {
    fontSize: 14,
    color: "#d0d5de",
    marginTop: 2,
  },

  password: {
    fontSize: 16,
    color: "#d0d5de",
    fontWeight: "500",
    letterSpacing: 1,
    marginTop: 2,
  },

  id: {
    marginTop: 12,
    fontSize: 11,
    color: "#d0d5de",
  },
});
