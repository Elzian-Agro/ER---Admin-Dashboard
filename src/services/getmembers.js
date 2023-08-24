import axios from "axios";

export default function memberService() {



  //Base URL Configuration
    const http = axios.create({
      baseURL:
      process.env.REACT_APP_BASE_URL,

      headers: {
        "Content-type": "application/json",
      
      },
    });


    //Get Land owners data
    async function getlandowners() {
        const values = await http.get("/member/getmembers").then((res) => res);
        return values
    }


    //Get Monthly Investors data
    async function getMonthlyUsers() {
        const values = await http.get("/member/getTotalInvestors").then((res) => res);
        return values
    }


    //Get Land owners state
    async function getLandownersState() {
        const values = await http.get("/member/getLandownersState").then((res) => res);
        return values.data.Result;
      }


      //Get number of Land owners Data
      async function getLandOwnerSum() {
        const values = await http.get("/member/getLandOwnerSum").then((res) => res);
        return values;
      }
    
      return {
          getlandowners,
          getMonthlyUsers,
          getLandownersState,
          getLandOwnerSum,         
      };
    }
  