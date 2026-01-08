import { City } from "@/types/City";
import { Hospitals } from "@/types/Hospitals";
import { ItemAttributes } from "@/types/ItemAttributes";
import { Patients } from "@/types/Patients";
import { PersonalDetail } from "@/types/PersonalDetail";
import { Session } from "@/types/Session";
import { Tournament } from "@/types/Tournament";
import * as SecureStore from "expo-secure-store";
import { ALL_SECURE_STORE_KEYS, SECURE_STORE_KEYS } from "./storageKeys";
import { getCityById } from "./utils";

export async function secureStorageSetItem<T = string>(
  key: string,
  value: T
): Promise<void> {
  const rawValue = typeof value === "string" ? value : JSON.stringify(value);
  await SecureStore.setItemAsync(key, rawValue);
}

export async function secureStorageGetItem<T = string>(
  key: string
): Promise<T | null> {
  const rawValue = await SecureStore.getItemAsync(key);
  try {
    return rawValue ? (JSON.parse(rawValue) as T) : null;
  } catch {
    return rawValue as T;
  }
}

export async function secureStorageDeleteItem(key: string): Promise<void> {
  await SecureStore.deleteItemAsync(key);
}

export async function resetSecureStorage(
  alsoRegistration: boolean = false
): Promise<void> {
  await Promise.all(
    ALL_SECURE_STORE_KEYS.map((key) => {
      if (
        (key === SECURE_STORE_KEYS.UID || key === SECURE_STORE_KEYS.PHONE_NO) &&
        !alsoRegistration
      ) {
        return Promise.resolve(); // skip UID if not alsoRegistration
      }
      return SecureStore.deleteItemAsync(key);
    })
  );
}

export async function resetSecureStorageWithLogs(
  alsoRegistration: boolean = false
): Promise<void> {
  for (const key of ALL_SECURE_STORE_KEYS) {
    if (
      (key === SECURE_STORE_KEYS.CITIES_DETAIL) &&
      !alsoRegistration
    ) {
      console.log(`Skipping UID key: ${key}`);
      continue;
    }
    const value = await SecureStore.getItemAsync(key);
    console.log(`Clearing key: ${key} →`, value);
    await SecureStore.deleteItemAsync(key);
  }
}

const getNotDeleteAbleData = (key: string) => {
  return key === SECURE_STORE_KEYS.UID || key === SECURE_STORE_KEYS.PHONE_NO;
};

export async function secureStorageLogs(): Promise<void> {
  console.log("-----------Storage Logs Start-----------");
  for (const key of ALL_SECURE_STORE_KEYS) {
    const value = await SecureStore.getItemAsync(key);
    console.log(`${key} →`, value);
  }
  console.log("-----------Storage Logs End-------------");
}

// Extra Helper Methods for better accesibility
export const savePhoneNo = async (phoneNo: string) => {
  secureStorageSetItem(SECURE_STORE_KEYS.PHONE_NO, phoneNo);
};

// export const savePersonalDetails = async (personal_detail: PersonalDetail) => {
//    const city = await getCityById(personal_detail.city_id); //save personal details with the city name
//   const updatedDetails: PersonalDetail = {
//     ...personal_detail,
//     city: city,
//   };
//   await secureStorageSetItem(SECURE_STORE_KEYS.PERSONAL_DETAIL, updatedDetails);
// };

export const saveTournamentDetails = async (tournaments: Tournament[]) => {
  const enrichedTournaments: Tournament[] = [];
  for (const tournament of tournaments) {
    const city = await getCityById(tournament.city_id);
    enrichedTournaments.push({
      ...tournament,
      city,
    }); 
};
await secureStorageSetItem(SECURE_STORE_KEYS.TOURNAMENT_DETAIL, enrichedTournaments);
await secureStorageSetItem(SECURE_STORE_KEYS.TIME, Date.now());
  };

export const saveCityDetails = async (city_detail: City) => {
  secureStorageSetItem(SECURE_STORE_KEYS.CITIES_DETAIL, city_detail);
};

export const savePatientslist = async (patients: Patients[]) => {
  secureStorageSetItem(SECURE_STORE_KEYS.PATIENTS, patients);
};

export const saveHospitalslist = async (hospitals: Hospitals[]) => {
  secureStorageSetItem(SECURE_STORE_KEYS.HOSPITALS, hospitals);
};

export const saveItemAttributes = async (item_attributes: ItemAttributes[]) => {
  secureStorageSetItem(SECURE_STORE_KEYS.ITEM_ATTRIBUTES, item_attributes);
};

export const getPhoneNo = async (): Promise<string | null> => {
  return await secureStorageGetItem(SECURE_STORE_KEYS.PHONE_NO);
};

export const getPersonalDetails = async (): Promise<PersonalDetail | null> => {
  return await secureStorageGetItem(SECURE_STORE_KEYS.PERSONAL_DETAIL);
};

export const getTournamentDetails = async (): Promise<Tournament[] | null> => {
  const time = new Date(await secureStorageGetItem(SECURE_STORE_KEYS.TIME)??Date.now()).getTime();
  const now = Date.now();
  const hours = 5*60*60*1000;
  if (now - time > hours){
    return null;
  } 
  return await secureStorageGetItem(SECURE_STORE_KEYS.TOURNAMENT_DETAIL);
};

export const getCityDetails = async (): Promise<City[] | null> => {
  return await secureStorageGetItem(SECURE_STORE_KEYS.CITIES_DETAIL);
};

export const getPatientlist = async (): Promise<Patients[] | null> => {
  return await secureStorageGetItem(SECURE_STORE_KEYS.PATIENTS);
};


export const getHospitalslist = async (): Promise<Hospitals[] | null> => {
  return await secureStorageGetItem(SECURE_STORE_KEYS.HOSPITALS);
};

export const getItemAttributes = async (): Promise<ItemAttributes[] | null> => {
  return await secureStorageGetItem(SECURE_STORE_KEYS.ITEM_ATTRIBUTES);
};


export const removePhoneNo = async () => {
  secureStorageDeleteItem(SECURE_STORE_KEYS.PHONE_NO);
};

export const saveMobileToken = async (token: string) => {
  secureStorageSetItem(SECURE_STORE_KEYS.UID, token);
};

export const getMobileToken = async (): Promise<string | null> => {
  return await secureStorageGetItem(SECURE_STORE_KEYS.UID);
};

export const removeMobileToken = async () => {
  secureStorageDeleteItem(SECURE_STORE_KEYS.UID);
};

export const saveSessionToken = async (token: string) => {
  secureStorageSetItem(SECURE_STORE_KEYS.SESSION_TOKEN, token);
};

export const getSessionToken = async (): Promise<string | null> => {
  return await secureStorageGetItem(SECURE_STORE_KEYS.SESSION_TOKEN);
};

export const removeSessionToken = async () => {
  await secureStorageDeleteItem(SECURE_STORE_KEYS.SESSION_TOKEN);
};

export const getUsername = async (): Promise<string | null> => {
  return await secureStorageGetItem(SECURE_STORE_KEYS.USERNAME);
};

export const saveSession = async (session: Session) => {
  await Promise.all([
    secureStorageSetItem(SECURE_STORE_KEYS.SESSION_TOKEN, session.token),
    secureStorageSetItem(SECURE_STORE_KEYS.EXPIRE, session.expire),
    secureStorageSetItem(
      SECURE_STORE_KEYS.REFRESH_EXPIRE,
      session.refreshExpire
    ),
    secureStorageSetItem(SECURE_STORE_KEYS.REFRESH_TOKEN, session.refreshToken),
  ]);
};

export const getSession = async (): Promise<Session | null> => {
  const [token, expire, refreshExpire, refreshToken] = await Promise.all([
    secureStorageGetItem<string>(SECURE_STORE_KEYS.SESSION_TOKEN),
    secureStorageGetItem<string>(SECURE_STORE_KEYS.EXPIRE),
    secureStorageGetItem<string>(SECURE_STORE_KEYS.REFRESH_EXPIRE),
    secureStorageGetItem<string>(SECURE_STORE_KEYS.REFRESH_TOKEN),
  ]);

  // if (!token || !expire || !refreshExpire || !refreshToken) return null;

  return {
    token,
    expire,
    refreshExpire,
    refreshToken,
  };
};

export const removeSession = async () => {
  await Promise.all([
    secureStorageDeleteItem(SECURE_STORE_KEYS.SESSION_TOKEN),
    secureStorageDeleteItem(SECURE_STORE_KEYS.EXPIRE),
    secureStorageDeleteItem(SECURE_STORE_KEYS.REFRESH_EXPIRE),
    secureStorageDeleteItem(SECURE_STORE_KEYS.REFRESH_TOKEN),
  ]);
};


let profilesData: PersonalDetail[] = [];

export const setProfiles = (data: PersonalDetail[]) => {
  profilesData = data;
};

export const getProfiles = (): PersonalDetail[] => profilesData;


