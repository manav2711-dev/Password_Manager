import { login } from "@/api/apis";
import DIALOG_TYPE from "@/constants/dialogType";
import { Route } from "@/constants/router";
import Theme from "@/constants/theme";
import { useDialog } from "@/context/DialogContext";
import {
  saveMobileToken,
  saveSession,
  secureStorageLogs,
  secureStorageSetItem
} from "@/lib/storage";
import { SECURE_STORE_KEYS } from "@/lib/storageKeys";
import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { showErrorDialog, showDialog } = useDialog();

  const handleLogin = async () => {
    // resetSecureStorageWithLogs(true);
    if (!(username && password)) {
      showErrorDialog("Invalid username or password!");
      return;
    }
    setIsSubmitting(true);
    try {
      console.log("-----------Login Start-----------")
      const res = await login(username, password);
      // console.log("res",JSON.stringify(res));
      if(res.accessToken == null){
        showDialog({
          title:"Login Failed",
          message: "Something went wrong!",
          type: DIALOG_TYPE.ERROR,
          buttons: [{ label: 'Ok', onPress: () => {}, style: 'cancel' },],
        })
        return;
      }
      saveSession(res);
      saveMobileToken(res.accessToken);
      secureStorageSetItem(SECURE_STORE_KEYS.USERNAME, username)
      router.replace(Route.PASSWORDS);
      // console.log("Login as:", res);
    } catch (err) {
      setIsSubmitting(false);
      showDialog({
        title:"Login Failed",
        message: "Something went wrong!",
        type: DIALOG_TYPE.ERROR,
        buttons: [{ label: 'Ok', onPress: () => {}, style: 'cancel' },],
      })
    } finally{
      console.log("-----------Login Done-----------");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to continue</Text>

        <TextInput
          mode="outlined"
          label="Username"
          value={username}
          activeOutlineColor={Theme.colors.primary}
          onChangeText={setUsername}
          keyboardType="default"
          autoCapitalize="none"
          style={styles.input}
        />

        <TextInput
          mode="outlined"
          label="Password"
          value={password}
          activeOutlineColor={Theme.colors.primary}
          onChangeText={setPassword}
          autoCapitalize="none"
          secureTextEntry
          style={styles.input}
        />

        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.button}
          disabled={isSubmitting}
          contentStyle={{ paddingVertical: 6 }}>
          Login
        </Button>

        <Button
          mode="contained"
          onPress={secureStorageLogs}
          style={styles.button}
          disabled={isSubmitting}
          contentStyle={{ paddingVertical: 6 }}>
          Print Logs
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Theme.colors.surface,
    justifyContent: "center",
    paddingHorizontal: Theme.spacing.lg,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: Theme.borders.radius.xl,
    padding: Theme.spacing.lg,
    // backdropFilter: "blur(10px)",
    borderWidth: Theme.borders.width.thin,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },

  title: {
    fontSize: Theme.typography.heading,
    fontWeight: Theme.typography.fontWeight.bold,
    textAlign: "center",
    marginBottom: Theme.spacing.xs,
  },
  subtitle: {
    fontSize: Theme.typography.small,
    color: Theme.colors.muted,
    textAlign: "center",
    marginBottom: Theme.spacing.xl + Theme.spacing.xl,
  },
  input: {
    borderColor: Theme.colors.primary,
    marginBottom: Theme.spacing.md,
  },
  button: {
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.borders.radius.xl,
    marginTop: Theme.spacing.xs,
  },
});
