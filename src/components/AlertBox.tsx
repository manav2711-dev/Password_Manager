import { View, Text, StyleSheet, ViewStyle } from "react-native";
import ALERT_TYPE, { AlertType } from "@/constants/alertType";
import Theme from "@/constants/theme";

const alertColors = {
  [ALERT_TYPE.SUCCESS]: {
    bg: Theme.colors.successBg,
    text: Theme.colors.success,
  },
  [ALERT_TYPE.ERROR]: {
    bg: Theme.colors.errorBg,
    text: Theme.colors.error,
  },
  [ALERT_TYPE.WARNING]: {
    bg: Theme.colors.warningBg,
    text: Theme.colors.warning,
  },
  [ALERT_TYPE.INFO]: {
    bg: Theme.colors.infoBg,
    text: Theme.colors.info,
  },
};

type Props = {
  type: AlertType;
  message: string;
  style?: ViewStyle;
};

export default function AlertBox({ type, message, style }: Props) {
  const { bg, text } = alertColors[type];

  return (
    <View style={[styles.alertBox, { backgroundColor: bg }, style]}>
      <Text style={[styles.alertText, { color: text }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  alertBox: {
    padding: Theme.spacing.sm,
    borderRadius: Theme.borders.radius.md,
    marginVertical: Theme.spacing.xs,
  },
  alertText: {
    fontSize: Theme.typography.body,
    fontWeight: Theme.typography.fontWeight.medium,
  },
});
