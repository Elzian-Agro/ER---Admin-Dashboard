import React, { useState } from "react";
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
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import TreeSpecies from "./pages/TreeSpecies";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import { LoginContext } from "./components/helper/Context";

function App() {
  const [isLoggedin, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState("")
  const [accessTokenMemory, setAccessTokenMemory] = useState("");
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
            {/* <Route exact path="/dashboard" component={Home} /> */}
            <ProtectedRoute path="/tables" component={Tables} auth={isLoggedin} />
            <ProtectedRoute path="/billing" component={Billing} auth={isLoggedin} />
            <ProtectedRoute path="/feed" component={Feed} auth={isLoggedin} />
            <ProtectedRoute path="/landOwner" component={LandOwner} auth={isLoggedin} />
            <ProtectedRoute path="/trees" component={Trees} auth={isLoggedin} />
            <ProtectedRoute path="/auditor" component={Auditor} auth={isLoggedin} />
            <ProtectedRoute path="/assign-Auditors" component={AssignAuditors} auth={isLoggedin} />
            <ProtectedRoute path="/profile" component={Profile} auth={isLoggedin} />
            <ProtectedRoute path="/calculation" component={Calculation} auth={isLoggedin} />
            <ProtectedRoute path="/treeSpecies" component={TreeSpecies} auth={isLoggedin} />
            {user === 'Admin' ? <Redirect from="*" to="/dashboard" /> : user === 'Investor' ? <Redirect from="*" to="/billing" /> : <Redirect from="*" to="/sign-in" />}
          </Main>
        </Switch>
      </div>

    </LoginContext.Provider>
  );
}

export default App;
