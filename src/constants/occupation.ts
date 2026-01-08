const OCCUPATION = {
  HOUSE_MAKER: 1,
  BUISNESS: 2,
  DOCTOR: 3,
  LECTURER: 4,
  STUDENT:5,
  PRIVATE_SERVICE:6,
  HOUSE_WIFE:7,
  CHARTERED_ACCOUNTANT:8,
  GOVT_SERVICE:9,
  AGRICULTURE:10,
  ELECTRICIAN:11,
  DAILY_WAGE:12,
  SUPPORT_EXECUTIVE:1006,
  ACCOUNTANT:1007,
  OPERATOR:1008,
} as const;

export type OccupationCode = (typeof OCCUPATION)[keyof typeof OCCUPATION];

export const OccupationMap: Record<OccupationCode, string> = {
  [OCCUPATION.HOUSE_MAKER]: 'House Maker',
  [OCCUPATION.BUISNESS]: 'Business',
  [OCCUPATION.DOCTOR]: 'Doctor',
  [OCCUPATION.LECTURER]: 'Lecturer',
  [OCCUPATION.STUDENT]: 'Student',
  [OCCUPATION.PRIVATE_SERVICE]: 'Private Service',
  [OCCUPATION.HOUSE_WIFE]: 'House Wife',
  [OCCUPATION.CHARTERED_ACCOUNTANT]: 'Chartered Accountant',
  [OCCUPATION.GOVT_SERVICE]: 'Govt. Service',
  [OCCUPATION.AGRICULTURE]: 'Agriculture',
  [OCCUPATION.ELECTRICIAN]: 'Electrician',
  [OCCUPATION.DAILY_WAGE]: 'Daily Wage',
  [OCCUPATION.SUPPORT_EXECUTIVE]: 'Support excecutive',
  [OCCUPATION.ACCOUNTANT]: 'Accountant',
  [OCCUPATION.OPERATOR]: 'Operator',
};

export default OCCUPATION;
