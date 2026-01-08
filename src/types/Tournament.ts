import { City } from "./City";

export type Tournament = {
  id: number;
  start_date: Date;
  reg_date:Date;
  end_date:Date;
  reg_id:number;
  reg_status:string;
  city_id:number;
  state_id:number;
  name: string; 
  type_remarks:string;
  event_type:number;
  address:string;
  latitude:number;
  longitude:number;
  city: City;
};


export const defaultTournament: Tournament = {
  id: 0,
  reg_id:0,
  reg_status:"",
  reg_date:new Date(),
  start_date: new Date(),       // current date as fallback
  end_date: new Date(),         // current date as fallback
  city_id: 0,
  state_id: 0,
  name: "",
  type_remarks: "",
  event_type: 1,
  address: "",
  latitude: 0,
  longitude: 0,
  city: {
    id: 0,
    name: "",
    countryId:0,
    stateId: 0
  }
};
