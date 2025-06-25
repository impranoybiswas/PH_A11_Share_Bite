import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import Loading from "../components/Loading";
import { FirebaseContext } from "../providers/Context";

export default function PrivateRoute({ children }) {
  const { loading, user } = useContext(FirebaseContext);
  
  const location = useLocation();

  if (loading) return <Loading />;

  if (!user) return <Navigate to="/signin" state={location?.pathname} replace={true} />;
  
  return children;
}
