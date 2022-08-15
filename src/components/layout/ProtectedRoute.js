import React from "react";
import { Route,useHistory } from "react-router-dom";

const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
    const history = useHistory();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth) return <Component {...props} />;
        if (!auth){
            history.push("/sign-in");
        }
        //   return (
        //     <Redirect to={{ path: "/sign-in", state: { from: props.location } }} />
        //   );
      }}
    />
  );
};

export default ProtectedRoute;