import { createContext, useContext, useState, ReactNode } from "react";
import AppDialog from "@/components/AppDialog";
import DIALOG_TYPE, { DialogType } from "@/constants/dialogType";

type DialogButton = {
  label: string;
  onPress: () => void;
  style?: "default" | "cancel" | "destructive";
};

type DialogConfig = {
  visible: boolean;
  title: string;
  message: string;
  type: DialogType;
  buttons: DialogButton[];
};

type DialogContextProps = {
  showDialog: (config: Omit<DialogConfig, "visible">) => void;
  hideDialog: () => void;
  showSuccessDialog: (msg: string, onClose?: () => void) => void;
  showErrorDialog: (msg: string, onClose?: () => void) => void;
  showInfoDialog: (msg: string, onClose?: () => void) => void;
  showWarningDialog: (msg: string, onClose?: () => void) => void;
  showConfirmDialog: (msg: string) => Promise<boolean>;
};

const DialogContext = createContext<DialogContextProps | undefined>(undefined);

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [dialog, setDialog] = useState<DialogConfig | null>(null);

  const showDialog = (config: Omit<DialogConfig, "visible">) => {
    setDialog({ ...config, visible: true });
  };

  const hideDialog = () => {
    setDialog(null);
  };

  const showSuccessDialog = (message: string, onClose?: () => void) =>
    showDialog({
      title: "",
      message,
      type: DIALOG_TYPE.SUCCESS,
      buttons: [
        {
          label: "OK",
          onPress: () => {
            hideDialog();
            onClose?.();
          },
        },
      ],
    });

  const showErrorDialog = (message: string, onClose?: () => void) =>
    showDialog({
      title: "",
      type: DIALOG_TYPE.ERROR,
      message,
      buttons: [
        {
          label: "OK",
          style: "cancel",
          onPress: () => {
            hideDialog();
            onClose?.();
          },
        },
      ],
    });

  // ✅ showInfoDialog
  const showInfoDialog = (message: string, onClose?: () => void) =>
    showDialog({
      title: "",
      type: DIALOG_TYPE.INFO,
      message,
      buttons: [
        {
          label: "Got it",
          style: "default",
          onPress: () => {
            hideDialog();
            onClose?.();
          },
        },
      ],
    });

  // ✅ showWarningDialog
  const showWarningDialog = (message: string, onClose?: () => void) =>
    showDialog({
      title: "",
      type: DIALOG_TYPE.WARNING,
      message,
      buttons: [
        {
          label: "Understood",
          style: "default",
          onPress: () => {
            hideDialog();
            onClose?.();
          },
        },
      ],
    });

  // ✅ showConfirmDialog (promise-based)
  const showConfirmDialog = (message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      showDialog({
        title: "",
        type: DIALOG_TYPE.INFO,
        message,
        buttons: [
          {
            label: "Cancel",
            style: "cancel",
            onPress: () => {
              hideDialog();
              resolve(false);
            },
          },
          {
            label: "Confirm",
            style: "default",
            onPress: () => {
              hideDialog();
              resolve(true);
            },
          },
        ],
      });
    });
  };

  return (
    <DialogContext.Provider
      value={{
        showDialog,
        hideDialog,
        showSuccessDialog,
        showErrorDialog,
        showConfirmDialog,
        showInfoDialog,
        showWarningDialog,
      }}>
      {children}
      {dialog && <AppDialog {...dialog} onClose={hideDialog} />}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) throw new Error("useDialog must be used within DialogProvider");
  return context;
};
