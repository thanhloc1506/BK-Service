import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Homepage from "../../views/Homepage";

const ProtectedRoute = ({ children }: any) => {
  const auth = useSelector((state: RootState) => state.user);

  if (!auth.authLoading) {
    if (auth.isAuthenticated) return children;
    return <Homepage />;
  }
};

export default ProtectedRoute;
