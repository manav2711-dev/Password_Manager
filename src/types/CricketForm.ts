export const cricketFormInputFields = ["height","weight",];

export const cricketFormDropdownFields = ["battingStyle","bowlingStyle","role"];

export const battingStyles = ["Select","Right-hand", "Left-hand"];
export const bowlingStyles = ["Select","Off-spin", "Leg-spin", "Fast"];
export const roles = ["Select","Batsman", "Bowler", "All-rounder", "Wicket-keeper"];


export type CricketForm = {
    height: number |string;
    weight: number|string;
    battingStyle: string;
    bowlingStyle: string,
    role: string,
};

export const defaultCricketForm: CricketForm = {
    height:"",
    weight: "",
    battingStyle: "",
    bowlingStyle: "",
    role: ""
};

export const cricketFormPlaceHolder: Record<string,string> = {
    height:"Height (in Cm)",
    weight:"Weight (in Kg)",
    battingStyle:"Batting Style (e.g. Right-hand)",
    bowlingStyle: "Bowling Style (e.g. Off-spin)",
    role:"Role (Batsman, Bowler, etc.)",
};


export const cricketFormLabels: Record<string,string> = {
    height:"Height",
    weight:"Weight",
    battingStyle:"Batting Style",
    bowlingStyle: "Bowling Style",
    role:"Role",
};


export const getDropdownOptions = (field: string): string[] => {
  switch (field) {
    case "battingStyle":
      return battingStyles;
    case "bowlingStyle":
      return bowlingStyles;
    case "role":
      return roles;
    default:
      return [];
  }
};
