import http from "./http-common";

class AuthService {
  // signup function
  signup(data) {
    console.log(data);
    return http.post("/addUser", data);
  }
  // signin function
  signin(data) {
    return http.post("/login", data);
  }
}

export default new AuthService();
