import axios from "axios";
// import Tokenservice from "./token-service";
import { useContext } from "react";
import { LoginContext } from "../components/helper/Context";

export default function BillingService() {
  // const { getLocalRefreshToken } = Tokenservice();


  //Base URL Configuration
  const { accessTokenMemory} = useContext(LoginContext);
  let accessTokenMemoryTmp = accessTokenMemory;
  const http = axios.create({
    baseURL:
    process.env.REACT_APP_BASE_URL,

    headers: {
      "Content-type": "application/json",
      "x-auth-token": accessTokenMemoryTmp,
    },
  });



  //Add Billing 
  async function addBillingData(formData) {
    const data = await http
      .post(
        "http://ec2-13-250-22-64.ap-southeast-1.compute.amazonaws.com:4000/billing/add",
        formData
      )
      .then((res) => res);
    console.log(data);
  }


  //Add Last Digit
  async function addLastDigitData(formData) {
    const data = await http
      .post(
        "http://ec2-13-250-22-64.ap-southeast-1.compute.amazonaws.com:4000/billing/addLastDigit",
        formData
      )
      .then((res) => res);
    console.log(data);
  }

  //Get Card data
  async function getCardDetails() {
    const data = await http.get("/billing").then((res) => res);
    return data;
  }

  //Get Last Digit
  async function getLastDigit() {
    const data = await http.get("/billing/getLast").then((res) => res);
    return data;
  }

  return {
    addBillingData,
    getCardDetails,
    addLastDigitData,
    getLastDigit,
  };
}
