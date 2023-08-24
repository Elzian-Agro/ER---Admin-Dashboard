import { useContext } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { LoginContext } from "../components/helper/Context"
import jwt_decode from "jwt-decode";
import { notification } from 'antd'

export default function AuthService() {
  const { setIsLoggedIn, setUser, setAccessTokenMemory } = useContext(LoginContext);
  const history = useHistory();


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
    }
  });

  // signup function
  async function AuthSignup(data) {
    // destructure the data Object
    const { Name, email, password, walletID } = data;
    return http
      .post("/admin/addUser", { userName: Name, email, password, walletID })
      .then((res) => console.log(res.data.message))
      .catch((err) => console.log(err));
  }

  // signin function
  // async function AuthSignin(data) {
  //   // set jwt token as a cookie if signedin
  //   const { email, password } = data;
  //     return http
  //     .post("/admin/login", { email, password })
  //     .then((res) => {
  //       setUser("");
  //       setIsLoggedIn(false)
  //       //setCookie("token", res.data.token);
  //       let decoded = jwt_decode(res.data.token);
  //       const {isAdmin,_id}=decoded;

  //       if(isAdmin===1){setUser("Admin")}
  //       else{setUser("Investor")}

  //       if(_id){setIsLoggedIn(true)}
  //       else{setIsLoggedIn(false)}

  //       setAccessTokenMemory(res.data.token)
  //       //localStorage.setItem("token", res.data.token)
  //       localStorage.setItem("refreshToken", res.data.refreshToken)
  //       history.push("/");
  //     })
  //     .catch((err) => {console.log(err); 
  //       openNotificationWithIcon(
  //         "error",
  //         "pleace check your credentials",
  //       );
  //       return err;

  //     });
  // }

  // async function AuthSignin(data) {
  //   // set jwt token as a cookie if signedin
  //   const { email, password } = data;
  //   console.log(email);
  //   console.log(password);

  //   return http
  //     .post("/admin/login", { email, password })
  //     .then((res) => {
  //       setUser("");
  //       setIsLoggedIn(false);
  //       //setCookie("token", res.data.token);
  //       let decoded = jwt_decode(res.data.token);
  //       const { isAdmin, _id } = decoded;

  //       if (isAdmin === 1) {
  //         setUser("Admin");
  //       } else {
  //         setUser("Investor");
  //       }

  //       if (_id) {
  //         setIsLoggedIn(true);
  //       } else {
  //         setIsLoggedIn(false);
  //       }

  //       setAccessTokenMemory(res.data.token);
  //       localStorage.setItem("token", res.data.token)
  //       localStorage.setItem("refreshToken", res.data.refreshToken);
  //       history.push("/");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       openNotificationWithIcon("error", "please check your credentials");
  //       return err;
  //     });
  // }

  // async function AuthSignin(data) {
  //   // set jwt token as a cookie if signed in
  //   const { email, password } = data;
  //   console.log(email);
  //   console.log(password);

  //   try {
  //     const res = await http.post("/admin/login", { email, password });
  //     setUser("");
  //     setIsLoggedIn(false);

  //     let decoded = jwt_decode(res.data.token);
  //     const { isAdmin, _id } = decoded;

  //     if (isAdmin === 1) {
  //       setUser("Admin");
  //     } else {
  //       setUser("Investor");
  //     }

  //     if (_id) {
  //       setIsLoggedIn(true);
  //     } else {
  //       setIsLoggedIn(false);
  //     }

  //     setAccessTokenMemory(res.data.token);
  //     localStorage.setItem("token", res.data.token);
  //     localStorage.setItem("refreshToken", res.data.refreshToken);
  //     history.push("/");
  //   } catch (err) {
  //     console.log(err);
  //     openNotificationWithIcon("error", "Please check your credentials");
  //     return err;
  //   }
  // }
  
  async function AuthSignin(data) {
  const { email, password } = data;
  try {
    const res = await http.post("/admin/login", { email, password });
    setUser("");
    setIsLoggedIn(false);

    const token = res.data.token;
    const decoded = jwt_decode(token);
    const { isAdmin, _id, exp } = decoded;

    const currentTime = Date.now() / 1000; // Convert to seconds
    console.log("Token:", token);
    console.log("Decoded Token:", decoded);
    console.log("isAdmin:", isAdmin);
    console.log("_id:", _id);
    console.log("Expiration Time:", exp);
    console.log("Current Time:", currentTime);

    if (exp < currentTime) {
      // Token has expired
      openNotificationWithIcon("error", "Token has expired");
      return;
    }

    if (isAdmin === 1) {
      setUser("Admin");
    } else {
      setUser("Investor");
    }

    if (_id) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    setAccessTokenMemory(token);
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", res.data.refreshToken);
    history.push("/");
  } catch (err) {
    console.log(err);
    openNotificationWithIcon("error", "Please check your credentials");
    return err;
  }
}


  
  function getID() {
    const token = localStorage.getItem('token');
    let decoded = jwt_decode(token);
    //const { isAdmin, _id } = decoded;
    const { _id } = decoded;
    return _id
  }

  function getIsAdmin() {
    const token = localStorage.getItem('token');
    let decoded = jwt_decode(token);
    const { isAdmin } = decoded;
    
    return isAdmin
  }


  return { AuthSignin, AuthSignup, getID, getIsAdmin };
}
