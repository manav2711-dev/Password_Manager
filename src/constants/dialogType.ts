const DIALOG_TYPE = {
  INFO: "info",
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error",
} as const;

export type DialogType = (typeof DIALOG_TYPE)[keyof typeof DIALOG_TYPE];

export default DIALOG_TYPE;
