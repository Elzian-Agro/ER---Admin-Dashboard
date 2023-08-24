import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Feed from "./pages/Feed";
import LandOwner from "./pages/LandOwner";
import Trees from "./pages/Trees";
import Auditor from "./pages/Auditor";
import AssignAuditors from "./pages/AssignAuditors";
import Profile from "./pages/Profile";
import Calculation from "./pages/Calculation";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Cart from "./pages/Cart";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import TreeSpecies from "./pages/TreeSpecies";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import { LoginContext } from "./components/helper/Context";
import jwt_decode from "jwt-decode";

function App() {
  const [isLoggedin, setIsLoggedIn] = useState("")
  const [user, setUser] = useState("")
  const [accessTokenMemory, setAccessTokenMemory] = useState("");

  useEffect(() => {
    checkLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  async function checkLoggedIn() {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    if (token) {
      try {
        const decoded = jwt_decode(token);
        const { isAdmin } = decoded;
        console.log("isAdmin:", isAdmin);
        if (isAdmin === 1) {
          setUser("Admin");
          console.log("setUser", user)
        } else {
          setUser("Investor");
          console.log("setUser", user)
        }
        setIsLoggedIn(true);
        console.log("setIsLoggedIn", isLoggedin)
      } catch (err) {
        console.log(err);
        setUser("");
        setIsLoggedIn(false);
        console.log("catch", user, isLoggedin)
      }
    } else {
      setUser("");
      setIsLoggedIn(false);
      console.log("else", user, isLoggedin)
    }
  }

  useEffect(() => {
    console.log("user:", user);
    console.log("isLoggedin:", isLoggedin);
  }, [user, isLoggedin]);

  return (

    <LoginContext.Provider
      value={{
        isLoggedin,
        setIsLoggedIn,
        user,
        setUser,
        accessTokenMemory,
        setAccessTokenMemory
      }}>
      <div className="App">
        <Switch>
          <Route path="/sign-up" exact component={SignUp} />
          <Route path="/sign-in" exact component={SignIn} />
          <Main>
            <ProtectedRoute path="/dashboard" component={Home} auth={isLoggedin} />
            <ProtectedRoute path="/tables" component={Tables} auth={isLoggedin} />
            <ProtectedRoute path="/billing" component={Billing} auth={isLoggedin} />
            <ProtectedRoute path="/feed" component={Feed} auth={isLoggedin} />
            <ProtectedRoute path="/landOwner" component={LandOwner} auth={isLoggedin} />
            <ProtectedRoute path="/trees" component={Trees} auth={isLoggedin} />
            <ProtectedRoute path="/auditor" component={Auditor} auth={isLoggedin} />
            <ProtectedRoute path="/assign-Auditors" component={AssignAuditors} auth={isLoggedin} />
            <ProtectedRoute path="/profile" component={Profile} auth={isLoggedin} />
            <ProtectedRoute path="/blockView" component={Calculation} auth={isLoggedin} />
            <ProtectedRoute path="/treeSpecies" component={TreeSpecies} auth={isLoggedin} />
            <ProtectedRoute path="/cart" component={Cart} auth={isLoggedin} />

            {/* <Route path="/dashboard" component={Home} />
            <Route path="/tables" component={Tables} />
            <Route path="/billing" component={Billing} />
            <Route path="/checkout-success" component={CheckoutSuccess} />
            <Route path="/feed" component={Feed} />
            <Route path="/landOwner" component={LandOwner} />
            <Route path="/trees" component={Trees} />
            <Route path="/auditor" component={Auditor} />
            <Route path="/assign-Auditors" component={AssignAuditors} />
            <Route path="/profile" component={Profile} />
            <Route path="/blockView" component={Calculation} />
            <Route path="/treeSpecies" component={TreeSpecies} />
            <Route path="/cart" component={Cart} /> */}

            
            {user === 'Admin' ? <Redirect to="/dashboard" /> : <Redirect to="/blockView" /> }
          </Main>
        </Switch>
      </div>

    </LoginContext.Provider>
  );
}

export default App;
