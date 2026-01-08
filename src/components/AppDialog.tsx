import { Dialog, Portal, Button, Text, TextInput } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import Theme from "@/constants/theme";
import { DialogType } from "@/constants/dialogType";
import { useEffect, useState } from "react";

type Props = {
  visible: boolean;
  message: string;
  type: DialogType;
  title?: string;
  inputProps?: {
    placeholder?: string;
    defaultValue?: string;
    onChangeText?: (text: string) => void;
  };
  buttons: {
    label: string;
    onPress: (inputValue?: string) => void;
    style?: "default" | "cancel" | "destructive";
  }[];
  onClose: () => void;
};

const backgroundColors = {
  info: Theme.colors.infoBg,
  success: Theme.colors.successBg,
  warning: Theme.colors.warningBg,
  error: Theme.colors.errorBg,
};

const textColors = {
  info: Theme.colors.info,
  success: Theme.colors.success,
  warning: Theme.colors.warning,
  error: Theme.colors.error,
};

const defaultText = {
  info: "ℹ️ Info",
  success: "✅ Success",
  warning: "⚠️ Warning",
  error: "❌ Error",
};

const buttonTextColors = {
  "default": Theme.colors.text,
  "cancel": Theme.colors.text,
  "destructive": Theme.colors.error,
};

export default function AppDialog({
  visible,
  title,
  message,
  type,
  inputProps,
  buttons,
  onClose,
}: Props) {
  const [inputValue, setInputValue] = useState(inputProps?.defaultValue || "");

  useEffect(() => {
    if (!visible) setInputValue("");
  }, [visible]);

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onClose}
        style={[styles.dialog]}>
        <Dialog.Title style={[styles.title,{ color: textColors[type] }]}>
          {title || defaultText[type]}
        </Dialog.Title>
        <Dialog.Content>
          <Text style={{marginBottom: 8 }}>
            {message}
          </Text>
          {inputProps && (
            <TextInput
              placeholder={inputProps.placeholder}
              value={inputValue}
              onChangeText={(text) => {
                setInputValue(text);
                inputProps.onChangeText?.(text);
              }}
              mode="outlined"
            />
          )}
        </Dialog.Content>

        <Dialog.Actions>
          {buttons.map((btn, i) => (
            <Button
              key={i}
              onPress={() => {
                onClose();
                btn.onPress(inputValue);
              }}
              textColor={buttonTextColors[btn?.style || "default"]}>
              {btn.label}
            </Button>
          ))}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialog: {
    borderRadius: Theme.borders.radius.md,
  },
  title: {
    fontWeight: "bold",
  },
});

/** 
// Example usage in a component:
import { useDialog } from '@/context/DialogContext';    
const { showDialog } = useDialog();

showDialog({
  title: 'Submit Note',
  message: 'Please enter a reason for this action:',
  type: ALERT_TYPE.INFO,
  inputProps: {
    placeholder: 'Type here...',
    onChangeText: (val) => console.log('Live value:', val),
  },
  buttons: [
    { label: 'Cancel', onPress: () => {}, style: 'cancel' },
    {
      label: 'Submit',
      onPress: (input) => {
        console.log('User submitted:', input);
      },
    },
  ],
});

*/
