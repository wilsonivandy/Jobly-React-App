import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../auth/UserContext";

// A higher-order component that wraps a route component
function PrivateRoute({ exact, path, children}) {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  if (!currentUser) {
    console.log(currentUser);
    console.log("redirecting to login cause you suck");
    return <Redirect to="/login" />
  }

  return (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  );
}

export default PrivateRoute;