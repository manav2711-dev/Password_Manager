import { TASK_STATUS, TaskStatus } from "@/constants/task-status";
import Theme from "@/constants/theme";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// import { Task } from "@/types/Task";
import { useToast } from "@/context/ToastContext";
import { Text as PaperText, RadioButton } from "react-native-paper";

type Props = {
  task: Task;
  onSubmit: (result: { task: Task; status: string; notes: string }) => void;
};

const statusColorMap: Record<string, string> = {
  Y: Theme.colors.primary,
  A: Theme.colors.secondary,
  C: Theme.colors.success,
  R: Theme.colors.error,
  default: Theme.colors.muted,
};

const getStatusCode = (sta: TaskStatus) => {
  switch(sta){
    case TASK_STATUS.ACTIVE:
      return "Y";
    case TASK_STATUS.ACCEPT:
      return "A";
    case TASK_STATUS.REJECT:
      return "R";
    case TASK_STATUS.DONE:
      return "C";
  }
}

export default function TodoItem({ task, onSubmit }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<string>(getStatusCode(TASK_STATUS.ACTIVE));
  const {showErrorToast} = useToast();

  const handleSubmit = () => {
    if(!notes){
      showErrorToast("Notes are mandatory!")
      return;
    }
    if(status === getStatusCode(TASK_STATUS.ACTIVE)){
      showErrorToast("Choose status first!")
      return;
    }
    onSubmit({
      task: task,
      status,
      notes,
    });
    setExpanded(false);
  };

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.statusStripe,
          {
            backgroundColor:
              statusColorMap[task.status] || statusColorMap.default,
          },
        ]}
      />
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <View style={styles.header}>
          <Text style={styles.title}>{task.workName}</Text>
          <Text style={styles.date}>
            {task.fromDate} → {task.toDate}
          </Text>
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.details}>
          <Text style={styles.description}>{task.workDetail}</Text>

          <TextInput
            placeholder="Add your notes..."
            value={notes}
            onChangeText={setNotes}
            style={styles.input}
          />

          <View style={styles.radioGroup}>
            <RadioButton.Group
              onValueChange={(value) => setStatus(value as TaskStatus)}
              value={status}>
              <View style={styles.radioRow}>
                <TouchableOpacity onPress={() => setStatus(getStatusCode(TASK_STATUS.ACCEPT))}>
                  <View style={styles.radioRow}>
                    <RadioButton value={TASK_STATUS.ACCEPT} />
                    <PaperText
                      style={
                        task.status === getStatusCode(TASK_STATUS.ACCEPT)
                          ? styles.radioSelected
                          : styles.radio
                      }>
                      Accept
                    </PaperText>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setStatus(getStatusCode(TASK_STATUS.DONE))}>
                  <View style={styles.radioRow}>
                    <RadioButton value={TASK_STATUS.DONE} />
                    <PaperText
                      style={
                        task.status === getStatusCode(TASK_STATUS.DONE)
                          ? styles.radioSelected
                          : styles.radio
                      }>
                      Done
                    </PaperText>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setStatus(getStatusCode(TASK_STATUS.REJECT))}>
                  <View style={styles.radioRow}>
                    <RadioButton value={TASK_STATUS.REJECT} />
                    <PaperText
                      style={
                        task.status === getStatusCode(TASK_STATUS.REJECT)
                          ? styles.radioSelected
                          : styles.radio
                      }>
                      Reject
                    </PaperText>
                  </View>
                </TouchableOpacity>
              </View>
            </RadioButton.Group>
          </View>

          <View style={styles.submit}>
            <Button title="✓ Submit" onPress={handleSubmit} />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: Theme.spacing.md,
    padding: Theme.spacing.md,
    borderRadius: Theme.borders.radius.md,
    backgroundColor: Theme.colors.background,
    shadowColor: Theme.colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: Theme.borders.radius.sm,
    elevation: 3,
  },
  statusStripe: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 10,
    borderTopRightRadius: Theme.borders.radius.md,
    borderBottomRightRadius: Theme.borders.radius.md,
  },
  header: {
    marginBottom: Theme.spacing.xs,
  },
  title: {
    fontSize: Theme.typography.subheading,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.text,
  },
  date: {
    fontSize: Theme.typography.small,
    color: Theme.colors.muted,
  },
  details: {
    marginTop: Theme.spacing.sm,
    gap: Theme.spacing.sm,
  },
  description: {
    fontSize: Theme.typography.body,
    marginBottom: Theme.spacing.sm,
  },
  input: {
    borderWidth: Theme.borders.width.thin,
    borderColor: Theme.colors.muted,
    padding: Theme.spacing.sm,
    borderRadius: Theme.borders.radius.md,
  },
  radioGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: Theme.spacing.sm,
  },
  radio: {
    fontSize: Theme.typography.body,
    color: Theme.colors.muted,
  },
  radioSelected: {
    fontSize: Theme.typography.body,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.primary,
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Theme.spacing.sm,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Theme.spacing.md,
    marginTop: Theme.spacing.sm,
  },
  submit: {
    marginTop: Theme.spacing.sm,
  },
});
