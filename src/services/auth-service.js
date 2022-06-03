import { useCookies } from "react-cookie";
import http from "./http-common";

export default function AuthService() {
  const [cookies, setCookie] = useCookies(["token"]);

  // const handleCookie(){
  //   setCookie()
  // }
  // signup function
  async function AuthSignup(data) {
    // destructure the data Object
    const { Name, email, password } = data;
    return http
      .post("/addUser", { userName: Name, email, password })
      .then((res) => console.log(res.data.message))
      .catch((err) => console.log(err));
  }

  // signin function
  async function AuthSignin(data) {
    // set jwt token as a cookie if signedin
    const { email, password } = data;
    return http
      .post("/login", { email, password })
      .then((res) => setCookie("token", res.data.token))
      .catch((err) => console.log(err));
  }

  return { AuthSignin, AuthSignup };
}
