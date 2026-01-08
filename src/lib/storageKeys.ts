// Add and use keys from here so it is easy to track and control them
export const SECURE_STORE_KEYS = {
  PHONE_NO: "phone_no",
  UID: "uid", // Mobile Token generate on time of registration
  USERNAME: "username",
  EXPIRE: "expire",
  REFRESH_EXPIRE: "refreshExpire",
  REFRESH_TOKEN: "refreshToken",
  SESSION_TOKEN: "session_Token", // token
  PERSONAL_DETAIL: "personal_detail", //personal details
  CITIES_DETAIL:"cities_detail", //city details
  TOURNAMENT_DETAIL:"tournament_detail", //tournament details
  ITEM_ATTRIBUTES:"item_attributes",
  TIME:"time",//item attributes
  PATIENTS:"patient_list",  //patient list
  HOSPITALS:"hospital_detail", //hospital details
};

export const ALL_SECURE_STORE_KEYS = Object.values(SECURE_STORE_KEYS);
