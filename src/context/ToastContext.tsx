// src/context/ToastContext.tsx
import { createContext, useContext, useState } from "react";
import { Snackbar } from "react-native-paper";
import { ViewStyle } from "react-native";
import ALERT_TYPE, { AlertType } from "@/constants/alertType";
import Theme from "@/constants/theme";

type Toast = {
  visible: boolean;
  message: string;
  type: AlertType;
};

type ToastOptions = {
  message: string;
  type?: AlertType;
  duration?: number;
};

type ToastContextType = {
  showToast: (options: ToastOptions) => void;
  showSuccessToast: (message: string, duration?: number) => void;
  showErrorToast: (message: string, duration?: number) => void;
  showWarningToast: (message: string, duration?: number) => void;
  showInfoToast: (message: string, duration?: number) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<Toast>({
    visible: false,
    message: "",
    type: ALERT_TYPE.INFO,
  });

  const hideToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  const showToast = ({
    message,
    type = ALERT_TYPE.INFO,
    duration = 3000,
  }: ToastOptions) => {
    setToast({ visible: true, message, type });

    // Automatically hide after duration
    setTimeout(() => {
      hideToast();
    }, duration);
  };

  // Default quick methods
  const showSuccessToast = (message: string, duration = 3000) =>
    showToast({ message, type: ALERT_TYPE.SUCCESS, duration });

  const showErrorToast = (message: string, duration = 3000) =>
    showToast({ message, type: ALERT_TYPE.ERROR, duration });

  const showWarningToast = (message: string, duration = 3000) =>
    showToast({ message, type: ALERT_TYPE.WARNING, duration });

  const showInfoToast = (message: string, duration = 3000) =>
    showToast({ message, type: ALERT_TYPE.INFO, duration });

  // Optional icon prefix
  const getEmoji = () => {
    switch (toast.type) {
      case ALERT_TYPE.SUCCESS:
        return "✅ ";
      case ALERT_TYPE.ERROR:
        return "❌ ";
      case ALERT_TYPE.WARNING:
        return "⚠️ ";
      case ALERT_TYPE.INFO:
      default:
        return "ℹ️ ";
    }
  };

  const getBackgroundColor = (): string => {
    switch (toast.type) {
      case ALERT_TYPE.SUCCESS:
        return Theme.colors.success; // "#4ade80";
      case ALERT_TYPE.ERROR:
        return Theme.colors.error; // "#f87171";
      case ALERT_TYPE.WARNING:
        return Theme.colors.warning; // "#facc15";
      case ALERT_TYPE.INFO:
      default:
        return Theme.colors.info; // "#38bdf8";
    }
  };

  return (
    <ToastContext.Provider
      value={{
        showToast,
        showSuccessToast,
        showErrorToast,
        showWarningToast,
        showInfoToast,
      }}>
      {children}
      <Snackbar
        visible={toast.visible}
        onDismiss={hideToast}
        style={[{ backgroundColor: getBackgroundColor() } as ViewStyle]}
        duration={Snackbar.DURATION_SHORT}>
        {getEmoji() + toast.message}
      </Snackbar>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
};

/**
Example Usage:

const { showSuccessToast, showErrorToast } = useToast();

showSuccessToast("User created successfully!");
showErrorToast("Something went wrong!");

 */
