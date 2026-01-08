export const TASK_STATUS = {
  ACTIVE: "active",
  ACCEPT: "accept",
  REJECT: "reject",
  DONE: "done",
} as const;

export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];
