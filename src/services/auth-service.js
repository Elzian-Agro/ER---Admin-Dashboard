import {useContext} from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";
import {LoginContext} from "../components/helper/Context"
import jwt_decode from "jwt-decode";
import {notification} from 'antd'

export default function AuthService() {
  const {setIsLoggedIn,setUser,setAccessTokenMemory}= useContext(LoginContext);
  const history= useHistory();


  const openNotificationWithIcon = (type, message, title) => {
    if (type === "success") {
      notification[type]({
        message: title,
        description: message,
      });
    } else {
      notification[type]({
        message: title,
        description: message,
      });
    }
  };


//Base URL Configuration
const http = axios.create({
  baseURL: 
  process.env.REACT_APP_BASE_URL,
  
  headers: {
    "Content-type": "application/json",
  }});

  // signup function
  async function AuthSignup(data) {
    // destructure the data Object
    const { Name, email, password,walletID } = data;
    return http
      .post("/admin/addUser", { userName: Name, email, password,walletID })
      .then((res) => console.log(res.data.message))
      .catch((err) => console.log(err));
  }

  // signin function
  async function AuthSignin(data) {
    // set jwt token as a cookie if signedin
    const { email, password } = data;
      return http
      .post("/admin/login", { email, password })
      .then((res) => {
        setUser("");
        setIsLoggedIn(false)
        //setCookie("token", res.data.token);
        let decoded = jwt_decode(res.data.token);
        const {isAdmin,_id}=decoded;
        
        if(isAdmin===1){setUser("Admin")}
        else{setUser("Investor")}

        if(_id){setIsLoggedIn(true)}
        else{setIsLoggedIn(false)}

        setAccessTokenMemory(res.data.token)
        //localStorage.setItem("token", res.data.token)
        localStorage.setItem("refreshToken", res.data.refreshToken)
        history.push("/");
      })
      .catch((err) => {console.log(err); 
        openNotificationWithIcon(
          "error",
          "pleace check your credentials",
        );
        return err;
       
      });
  }

  return { AuthSignin, AuthSignup };
}
