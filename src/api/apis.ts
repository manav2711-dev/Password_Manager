import {
  getPhoneNo
} from "@/lib/storage";
import { ItemAttributes } from "@/types/ItemAttributes";
import { Patients } from "@/types/Patients";
import { PersonalDetail } from "@/types/PersonalDetail";
import { UserDetail } from "@/types/UserDetail";
import { format } from "date-fns";
import api from "./axios";

export const register = async (UserDetail: UserDetail| null) => {     //api call for registration
  const response = await api.post(`auth/mob/register`, {
    fullname:UserDetail?.name,
    email:UserDetail?.email,
    password:UserDetail?.confirmPassword,
    phone:UserDetail?.mobile,
  }
    // params: {
    //   mobile: UserDetail?.mobile,
    //   dail_code: "(+91) India",
    // },
);
  console.log("reg response",response.data)
  return response.data;
};

export const verifyOtp = async (phone: string, ref: string, token: string) => {  //api call to verify otp
  const response = await api.post("ws/mob/ver_reg", null, {
    params: {
      phone: phone,
      ref: ref,
      token: token,
    },
  });
  console.log("OTP response",response.data)
  return response.data;
};

export const login = async (username: string, password: string) => {   // api call for login
  const response = await api.post(`auth/mob/login`, {
    email:username,
    password,
  });
   console.log("Login response",response.data)
  return response.data;
};

export const getPasswords = async (userId: string) => {
  try {
     const response = await api.post(`auth/mob/getPasswords`, {
    userId:userId,
  });
   console.log("passwords response",response.data)
  return response.data;
  } catch (error) {
    console.log("error",error)
  }   // api call for login
};

export const encryptPassword = async (passData: any,userId:string) => {   // api call for login
  const response = await api.post(`auth/mob/encrypt`, {
    passData:passData,
    userId:userId,
  });
   console.log("encrypt passwords response",response.data)
  return response.data;
};


export const decryptPassword = async (passId: string) => {   // api call for login
  const response = await api.post(`auth/mob/decrypt`, {
    passId:passId,
  });
   console.log("passwords response",response.data)
  return response.data;
};

export const getPersonDetail = async (mobile: string) => {   //api call to get personal details
  console.log("Calling API: api/sports/personalDetail", { mobile });
  const response = await api.post("api/sports/personalDetail", null, {
    params: {
      mobile: mobile
    }
  }
  );
  console.log("Response from API:", response.data);
  return response.data;
};

export const getCity = async () => {   // api call to get city details
  console.log("Calling API: api/sports/city");
  const response = await api.get("api/sports/city");
   console.log("Response from API:", response.data);
  return response.data;
};

export const registerPersonalDetail = async (detail: PersonalDetail) => {   //api all to register personal details
  console.log("Calling API: api/sports/addProfile", detail);
  const reqBody = JSON.stringify(detail);
  const response = await api.post("api/sports/addProfile", reqBody);
  console.log("Response from API:", response.data);
  return response.data;
};

// export const getTournaments = async () => {    //api call to get tournaments 
//       const detail = await getPersonalDetails();
//   console.log("Calling API: api/sports/Tournaments", { detail});
//   const response = await api.get("api/sports/tournaments",{
//     params: {
//       person:detail?.id
//     }
//   }
//   );
//   console.log("Response from API:", response.data);
//   return response.data;
// };

// export const sendImage = async (formData: FormData) => {  //api call to send image
//   console.log("Calling API: api/sports/Tournaments", formData);
//   const response = await api.post("ws/mob/m_reg", formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });
//   return response.data;
// };

export const sendImage = async (formData: FormData) => {
  console.log("Calling API:ws/mob/m_reg");

  (formData as any)._parts.forEach(([key, value]: [string, any]) => {
    console.log(`${key}:`, value);
  });

  const response = await api.post("ws/mob/m_reg", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const tournamentRegister = async (   //api call to register tournaments
  event: number, //tournament id
  e_type:number,  //event id(event_type)
  person: number, //person id
  details: ItemAttributes[], 
) => {
   console.log("Calling API: api/sports/event_reg", details);
     console.log("tournamentId:",event,"person id:",person,"event id:",e_type);
  const response = await api.post("api/sports/event_reg", details,{
    params:{
    event,
    e_type,
    person,
    }
  });
  return response.data;
};


export const getAttributeDetails = async (   // api call to get item attributes
  event: number,
) => {
   console.log("Calling API: api/sports/attributes", event);
  const response = await api.get("api/sports/attributes", {
      params: {
      event,
    }
  });
    console.log("Response from API:", response.data);
  return response.data;
};

export const getHospitals = async () => {   // api call to get hospital details
  console.log("Calling API: api/sports/hospitals");
  const response = await api.get("api/sports/hospitals");
   console.log("Response from API:", response.data);
  return response.data;
};

export const getPatients = async (id:number) => {  // api call to get patient details
    const mobile = await getPhoneNo();  
  console.log("Calling API: api/sports/patientList",id,mobile);
  const response = await api.post("api/sports/patientList",null,{
    params:{
      id,
      mobile,
    }
  });
   console.log("Response from API:", response.data);
  return response.data;
}; 


export const getDiagnosis = async (id:number,hId:number) => {  // api call to get diagnosis details 
  console.log("Calling API: api/sports/diagnoseDetail",id,hId);
  const response = await api.post("api/sports/diagnoseDetail",null,{
    params:{
      id,
      hId,
    }
  });
   console.log("Response from API:", response.data);
   if( response.data.medicines){
    JSON.stringify( response.data.medicines);
   }
  return response.data;
};


export const getDoctors = async (hId:number) => {  // api call to get diagnosis details 
  console.log("Calling API: api/sports/doctors",hId);
  const response = await api.post("api/sports/doctors",null,{
    params:{
      hId,
    }
  });
   console.log("Response from API:", response.data);
  return response.data;
};

export const bookAppointments = async (hId:number,dId:number,pId:number,dt:Date) => { 
  const formatDate = format(dt,"yyyy-MM-dd");
  console.log("Calling API: api/sports/reqAppointment",hId,dId,pId,formatDate);
  const response = await api.post("api/sports/reqAppointment",null,{
    params:{
      hId,
      dId,
      pId,
      dt: formatDate,
    }
  });
   console.log("Response from API:", response.data);
  return response.data;
};


export const registerPatientDetail = async (detail: Patients,hId:number) => {   //api all to register personal details
  console.log("Calling API: api/sports/updatePatient", detail,hId);
  const reqBody = JSON.stringify(detail);
  const response = await api.post("api/sports/updatePatient", reqBody,{
    params:{
      hId,
    }
  });
  console.log("Response from API:", response.data);
  return response.data;
};

