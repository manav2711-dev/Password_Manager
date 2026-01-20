import { encryptPassword, getPasswords } from "@/api/apis";
import { GradientButton } from "@/components/button";
import TournamentCard from "@/components/TournamentCard"; // Create this component
import Colors from "@/constants/colors";
import { useGlobalData } from "@/context/GlobalDataContext";
import { getUserDetails } from "@/lib/storage";
import { Passwords } from "@/types/Passwords";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { Dialog, FAB, Portal, Text, TextInput } from "react-native-paper";

export default function TournamentListScreen() {
  const [passwords, setPasswords] = useState<Passwords[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const {searchQuery } = useGlobalData();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
  name: "",
  username: "",
  password: "",
  description: "",
});

const handleAddPassword = async () => {
  try {
    const user = await getUserDetails();

    if (!user?.id) {
      throw new Error("User not logged in");
    }

    // keep a stable copy of form
    const payload = {
      name: form.name,
      username: form.username,
      password: form.password,
      description: form.description,
    };

    console.log("Sending payload:", payload);

    const res = await encryptPassword(payload, user.id);

    // ✅ ONLY after success
    setOpen(false);
    setForm({
      name: "",
      username: "",
      password: "",
      description: "",
    });

    onRefresh(); // reload list if needed
  } catch (err) {
    console.error("Add password failed:", err);
  }
};

    
    const fetchPasswords = async (Refresh=false) => {
    try {
      const user = await getUserDetails();
      console.log("saved user",user)
      let res:Passwords[];
      if(!Refresh){
         res = await getPasswords(user.id); 
      }else{
        res= await getPasswords(user.id);
      }
      setPasswords((res as Passwords[]));
    } catch (err) {
      console.log("Error fetching Passwords:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPasswords();  
  }, []);

  const onRefresh = useCallback(() => {  //on reload make api call again
    setRefreshing(true);
    fetchPasswords(true);
  }, []);


  return (
    <View style={{ padding: 16, flex: 1, justifyContent: "center" }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : passwords && passwords.length > 0 ? (
        <FlatList
          data={passwords}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <TournamentCard password={item}/>}  //tournament card
           refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <Text>No Passwords available</Text>
      )}

      <FAB
      icon="plus"
      style={styles.fab}
      onPress={() => setOpen(true)}
    />

    {/* Dialog */}
    <Portal>
     <Dialog
  visible={open}
  onDismiss={() => setOpen(false)}
  style={styles.dialog} // ensures white surface
>
  {/* 🔹 Gradient Header ONLY */}
  <LinearGradient
    colors={Colors.primaryGradient.colors}
    start={Colors.primaryGradient.start}
    end={Colors.primaryGradient.end}
    style={styles.dialogHeader}
  >
    <Text style={styles.dialogTitle}>Add Password</Text>
  </LinearGradient>

  {/* 🔹 White Content */}
  <Dialog.Content>
    <TextInput
      label="Name"
      mode="outlined"
      value={form.name}
      onChangeText={(text) => setForm({ ...form, name: text })}
      style={styles.input}
    />

    <TextInput
      label="Username"
      mode="outlined"
      value={form.username}
      onChangeText={(text) => setForm({ ...form, username: text })}
      style={styles.input}
    />

    <TextInput
      label="Password"
      mode="outlined"
      secureTextEntry
      value={form.password}
      onChangeText={(text) => setForm({ ...form, password: text })}
      style={styles.input}
    />

    <TextInput
      label="Description"
      mode="outlined"
      multiline
      numberOfLines={3}
      value={form.description}
      onChangeText={(text) => setForm({ ...form, description: text })}
      style={styles.input}
    />
  </Dialog.Content>

  {/* 🔹 Actions */}
  <Dialog.Actions>
    <GradientButton label ="cancel" onPress={() => setOpen(false)}/>
    <GradientButton label="Save" onPress={handleAddPassword} />
  </Dialog.Actions>
</Dialog>
    </Portal>
  </View>

  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 16,
    bottom: 24,
    backgroundColor: "white",
  },
  dialog: {
    backgroundColor: "white", // ensures full white body
    borderRadius: 28,
    overflow: "hidden", // prevents gradient bleed
  },

  dialogHeader: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },

  dialogTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  input: {
    marginBottom: 12,
    backgroundColor: "white", // keeps inputs white
  },
});
