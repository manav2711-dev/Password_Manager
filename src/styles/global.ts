import { StyleSheet } from "react-native";
import Theme from "@/constants/theme";

const GlobalStyles = StyleSheet.create({
  // 🎯 Center everything in screen
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // ✅ Success box or text
  success: {
    backgroundColor: Theme.colors.successBg,
    color: Theme.colors.success,
    padding: Theme.spacing.sm,
    borderRadius: Theme.borders.radius.md,
  },

  // ❌ Error box or text
  error: {
    backgroundColor: Theme.colors.errorBg,
    color: Theme.colors.error,
    padding: Theme.spacing.sm,
    borderRadius: Theme.borders.radius.md,
  },

  // ⚠️ Warning box or text
  warning: {
    backgroundColor: Theme.colors.warningBg,
    color: Theme.colors.warning,
    padding: Theme.spacing.sm,
    borderRadius: Theme.borders.radius.md,
  },

  // ℹ️ Info box or text
  info: {
    backgroundColor: Theme.colors.infoBg,
    color: Theme.colors.info,
    padding: Theme.spacing.sm,
    borderRadius: Theme.borders.radius.md,
  },

  // 💬 Muted / subtle text
  mutedText: {
    color: Theme.colors.muted,
    fontSize: Theme.typography.small,
  },
});

export default GlobalStyles;
