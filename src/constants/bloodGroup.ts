
const BLOOD_GROUP = {
  A_POS: 'A+',
  A_NEG: 'A−',
  B_POS: 'B+',
  B_NEG: 'B−',
  O_POS: 'O+',
  O_NEG: 'O−',
  AB_POS: 'AB+',
  AB_NEG: 'AB−',
} as const;

export type BloodGroup = (typeof BLOOD_GROUP)[keyof typeof BLOOD_GROUP];

export const bloodGroupList: BloodGroup[] = Object.values(BLOOD_GROUP);

export default BLOOD_GROUP;
