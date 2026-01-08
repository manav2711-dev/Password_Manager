import { ItemAttributes } from "@/types/ItemAttributes";

export type gameMetaData = {
  name: string;
  icon: string;
  color: string;
  attrs: ItemAttributes[]|null;
};

export const activityTypeMap: Record<number, gameMetaData> = {
  // Sports
  1: { name: "Cricket", icon: "🏏", color: "#28a745",attrs:null },
  2: { name: "Hockey", icon: "🏑", color: "#1e90ff",attrs:null },
  3: { name: "Football", icon: "⚽️", color: "black",attrs:null },

  31: { name: "Chess", icon: "♟️", color: "#6c757d",attrs:null },
  32: { name: "Tennis", icon: "🎾", color: "#f39c12",attrs:null },
  33: { name: "Golf", icon: "🏌️‍♂️", color: "#2ecc71",attrs:null },

  51: { name: "Boxing", icon: "🥊", color: "#dc3545",attrs:null },
  52: { name: "Martial Arts", icon: "🥋", color: "#9b59b6",attrs:null },
  53: { name: "Gymnastics", icon: "🤸‍♀️", color: "#fd7e14",attrs:null },

  // Events
  101: { name: "Camp", icon: "🏕️", color: "#17a2b8",attrs:null },
  102: { name: "Workshop", icon: "🛠️", color: "#6f42c1",attrs:null },
  103: { name: "Exhibition", icon: "🎪", color: "#be8e5a",attrs:null },
  104: { name: "Meeting/Conference", icon: "👥", color: "#20c997",attrs:null },
  105: { name: "Social / Cultural Event", icon: "🎭", color: "#ffc107",attrs:null },
  106: { name: "Religious Event", icon: "🕉️", color: "#795548",attrs:null },
};
