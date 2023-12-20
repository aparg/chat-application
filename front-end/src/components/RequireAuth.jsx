import { Outlet, useLocation, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Login from "./Login";

const RequireAuth = () => {
  const location = useLocation();
  const { auth } = useAuth();
  console.log(auth);
  return auth?.name ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
