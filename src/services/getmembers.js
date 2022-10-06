import axios from "axios";
import Tokenservice from "./token-service";


export default function memberService() {
    
    const http = axios.create({
      baseURL:
        "http://ec2-13-250-22-64.ap-southeast-1.compute.amazonaws.com:4000",
      headers: {
        "Content-type": "application/json",
      
      },
    });
    async function getlandowners() {
      const values = await http.get("/member/getmembers").then((res) => res);
      console.log(values)
      return values
    }
    // async function getlandowners() {
    //   const values = await http.get("/member/getlandowners").then((res) => res);
    //   console.log(values)
    //   return values.data[0]['count(*)'];
    // }
    // async function getauditors() {
    //     const values = await http.get("/member/getauditors").then((res) => res);
    //     console.log(values);
    //     return values.data[0]['count(*)'];
    //   }
    
    //   async function getfieldagents() {
    //     const values = await http.get("/member/getfieldagents").then((res) => res);
    //     console.log(values);
    //     return values.data[0]['count(*)'];
    //   }
  
    //   async function getinvesters() {
    //       const values = await http.get("/member/getinvesters").then((res) => res);
    //       console.log(values);
    //       return values.data[0]['count(*)'];
    //     }
    
      
    
      return {
          getlandowners,
          
         
      };
    }
  