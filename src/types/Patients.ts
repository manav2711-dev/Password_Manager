import { City } from "./City";

export type Patients = {
      id: number;
    name: string;
    father:string;
    mother:string;
    dob: Date|null;
    adhaar:string;
    male: string;
    qualificationId: number |null 
    bloodGroup: string;
    mobile: string|number;
    address: string;
    adminss_no: string|number;
    city_id:number;
    state_id:number; 
    city: City|null; 
}