//import emailjs from '@emailjs/browser';
//import { useState , useEffect } from 'react';
import axios from 'axios';
import {useContext} from 'react'
import Tokenservice from './token-service';
import { LoginContext } from '../components/helper/Context';
//import service from "./data-service";



export default function Emailnoti() {

  
  const { getLocalRefreshToken} = Tokenservice();
  //const { getProfile } = service();

  const {accessTokenMemory,setAccessTokenMemory}= useContext(LoginContext);
  let accessTokenMemoryTmp=accessTokenMemory;


  //Base URL Configuration
  const http = axios.create({
    baseURL:
    process.env.REACT_APP_BASE_URL,
    
    headers: {
      "Content-type": "application/json",
      "x-auth-token": accessTokenMemoryTmp
    },
  });
  http.interceptors.request.use(
    (config) => {
      const token = accessTokenMemoryTmp
      if (token) {
        config.headers["x-auth-token"] = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  http.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (err.response.status===401) {
        // access token expired
        if (err && !originalConfig._retry) {
          // handle infinite loop
          originalConfig._retry = true;
          try {
            const rs = await http.post("/admin/getNewAccessToken", {
              refreshToken: getLocalRefreshToken(),
            });
            const { accessToken } = rs.data;
            accessTokenMemoryTmp=accessToken;
            setAccessTokenMemory(accessTokenMemoryTmp)
           // updateNewAccessToken(accessToken);
            return http(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }
      return Promise.reject(err);
    }
  );



   /*
      This Method for email notification Button. 
      when admin enable or disable email notification , 
      it save in the database.
   */
   async function setDetails(e) {
    const data2 = {
      values : e.values,
  };
  await http.put("/email/setmail",data2).then((res) => res);
  }



  /*
    When the admin login to the system again, 
    if he has previosly enabled email notification, 
    to show it.
  */
  async function getProfileNotification() {
    const values = await http.get("/email/getProfileNotification").then((res) => res);
    return values.data.Result[0].emailNotification;
  }



  /*
    This method for Modification. 
    when admin modify or add new tree in the tree species page, the system sent msg to those admins who have enable email notification.
  */ 
 async function Modify(props){
  const AdminMail = await getAdmin();

  for (let index = 0; index < AdminMail.length; index++) {
      
  }
  
}; 
  


   /*
    This method for Investor Payment . 
    this method send msg to particuler Inverter and all Admins after invester payment successfull.
  */
  async function billing(props){
  console.log(props)
  //const {email} = await getProfile();
  const AllAdminEmails = await getAllAdmins();
    for (let index = 0; index < AllAdminEmails.length; index++) {
    }
  }

 

  //To get admins, those who have enabled email notification.
  async function getAdmin() {
    const values = await http.get("/email/getAdmin").then((res) => res);
    return values.data.Result;
  }



  //To get all Admins in the database.
  async function getAllAdmins() {
    const values = await http.get("/email/getAllAdmins").then((res) => res);
    return values.data.Result;
  }


  return {
    Modify,
    setDetails,
    getProfileNotification,
    billing
    
  }
}