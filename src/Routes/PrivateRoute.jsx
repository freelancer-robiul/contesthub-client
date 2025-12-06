// src/Routes/PrivateRoute.jsx
import { Navigate, useLocation } from "react-router-dom";

// TODO: later replace this with real auth (context + JWT)
const fakeUser = null;
// const fakeUser = { _id: "123", name: "Demo User" };

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  const user = fakeUser;

  if (!user) {
    // not logged in → go to login page, remember where user wanted to go
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
