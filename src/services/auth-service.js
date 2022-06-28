import axios from "axios";
import { useCookies } from "react-cookie";

export default function AuthService() {
  const [, setCookie] = useCookies(['token']);

const http = axios.create({
  baseURL: "http://ec2-13-229-44-15.ap-southeast-1.compute.amazonaws.com:4000",
  headers: {
    "Content-type": "application/json",
  }});

  // signup function
  async function AuthSignup(data) {
    // destructure the data Object
    const { Name, email, password } = data;
    return http
      .post("/admin/addUser", { userName: Name, email, password })
      .then((res) => console.log(res.data.message))
      .catch((err) => console.log(err));
  }

  // signin function
  async function AuthSignin(data) {
    // set jwt token as a cookie if signedin
    const { email, password } = data;
    // try {
    //   await http.post("/admin/login", { email, password }).then(res => console.log(res));
    // } catch (error) {
      
    //   console.log(error);
    // }
      return http
      .post("/admin/login", { email, password })
      .then((res) => setCookie("token", res.data.token))
      .catch((err) => console.log(err));
  }

  return { AuthSignin, AuthSignup };
}
