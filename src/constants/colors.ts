const Colors = {
  primary: "#1e4eb8",
    primaryGradient: {
    colors: ["#283542", "#255fdb"],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  secondary: "#ff9500",
  background: "#ffffff",
  surface: "#f7f7f7",
  text: "#1c1c1e",
  subtitle:'#444',
  muted: "#8e8e93",
  shadow: "#000000",
  success: "#065f46",
  successBg: "#d1fae5",
  warning: "#92400e",
  warningBg: "#fef3c7",
  error: "#991b1b",
  errorBg: "#fee2e2",
  info: "#0369a1",
  infoBg: "#e0f2fe",
} as const;

export default Colors;
