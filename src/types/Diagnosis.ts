export type Diagnosis ={
problemDesc: string;
  date: string;
  doctor: string;
  problem: string;
  medicines:Medicines[];
};

export type Medicines ={
composition: string;
  dosage: string;
  dosageIn: number;
  repetionDosage: string;
};