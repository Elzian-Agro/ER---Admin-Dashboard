import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Feed from "./pages/Feed";
import LandOwner from "./pages/LandOwner";
import Trees from "./pages/Trees";
import Auditor from "./pages/Auditor";
import Profile from "./pages/Profile";
import Calculation from "./pages/Calculation"
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
          <Route exact path="/dashboard" component={Home} />
          <Route exact path="/tables" component={Tables} />
          <Route exact path="/billing" component={Billing} />
          <Route exact path="/feed" component={Feed} />
          <Route exact path="/landOwner" component={LandOwner} />
          <Route exact path="/trees" component={Trees} />
          <Route exact path="/auditor" component={Auditor} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/calculation" component={Calculation} />
          <Redirect from="*" to="/dashboard" />
        </Main>
      </Switch>
    </div>
  );
}

export default App;
