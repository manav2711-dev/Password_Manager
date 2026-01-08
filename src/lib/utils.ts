import { City } from "@/types/City";
import { Linking } from "react-native";
import { secureStorageGetItem } from "./storage";
import { SECURE_STORE_KEYS } from "./storageKeys";

export function isValidNumber(value: string): boolean {
  return /^\d+$/.test(value);
}


//method that gives city name from city id
export const getCityById = async (cityId: number): Promise<City> => {
  if (!cityId) return getDefaultCity();

  const storedCities = await secureStorageGetItem<City[]>(SECURE_STORE_KEYS.CITIES_DETAIL);

  if (storedCities && Array.isArray(storedCities)) {
    const matchedCity = storedCities.find(city => city.id === cityId);
    return matchedCity ?? getDefaultCity();
  }
  return getDefaultCity();
};

export const getDefaultCity = (): City => {
  return {
    id: 0,
    name: "",
    stateId: 0,
    countryId: 0,
  };
}
 
// method to check event/tournament
export function isEvent(id: number): boolean {
  return id>100;
}

// method to open google maps 
export function openInMaps(latitude: number, longitude: number) {
  if (latitude && longitude) {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  }
}

//method to give statusinfo and color 
export function getStatusInfo(status: string | null): { text: string; color: string } {
  switch ((status || "").toUpperCase()) {
    case "P":
      return { text: "Pending", color: "#007bff" }; // blue
    case "A":
      return { text: "Approved", color: "#28a745" }; // green
    case "R":
      return { text: "Rejected", color: "#dc3545" }; // red
    default:
      return { text: "Pending", color: "#007bff" }; // gray fallback
  }
}

