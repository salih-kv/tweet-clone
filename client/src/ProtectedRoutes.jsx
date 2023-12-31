import { Navigate, Outlet } from "react-router-dom";

import { useContext } from "react";
import LoginContext from "./context/LoginContext.js";

const ProtectedRoutes = () => {
  const { loggedIn } = useContext(LoginContext);
  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
