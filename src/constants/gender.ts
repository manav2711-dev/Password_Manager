const GENDER = {
  MALE: 'M',
  FEMALE: 'F',
  OTHERS: 'O'
} as const;

export type GenderCode = (typeof GENDER)[keyof typeof GENDER];

export const GenderMap: Record<GenderCode, string> = {
  [GENDER.MALE]: 'Male',
  [GENDER.FEMALE]: 'Female',
  [GENDER.OTHERS]: 'Others',
};

export default GENDER;