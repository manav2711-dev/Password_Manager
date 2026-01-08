import PaperTheme from "@/constants/paperTheme";
import { DialogProvider } from "@/context/DialogContext";
import { GlobalDataProvider } from "@/context/GlobalDataContext";
import { ToastProvider } from "@/context/ToastContext";
import { Slot } from "expo-router";
import { StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
  return  (
    <SafeAreaProvider>
    <PaperProvider theme={PaperTheme}>
      <GlobalDataProvider>
    <ToastProvider>
      <DialogProvider>
          <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
                <Slot />
              </SafeAreaView>
      </DialogProvider>
    </ToastProvider>
    </GlobalDataProvider>
  </PaperProvider>
  </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Optional: match your app's theme
  },
});