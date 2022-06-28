import { useCookies } from "react-cookie";
import axios from "axios";

export default function DataService(){
   const [cookies] = useCookies(['token']);

const http = axios.create({
  baseURL: "http://ec2-13-229-44-15.ap-southeast-1.compute.amazonaws.com:4000",
  headers: {
    "Content-type": "application/json",
    "x-auth-token": cookies.token
  }});

  async function getTrees(){
    const data = await http.get("/trees").then((res) => res.data.Result)
     return data
  }

  return {getTrees} 
}
