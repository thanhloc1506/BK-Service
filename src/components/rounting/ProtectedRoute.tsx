import React, { useEffect } from "react";
import { Route, useNavigate, Link, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { loadUser } from "../../redux/slices/auth";
import Loading from "../../views/Loading";
import Homepage from "../../views/Homepage";

interface IProps {
  path: string;
  Component: React.ComponentType<any>;
}

const ProtectedRoute = ({ children }: any) => {
  const auth = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  if (auth.authLoading) {
    return <Loading />;
  } else {
    if (auth.isAuthenticated) return children;
    return <Homepage />;
  }
};

export default ProtectedRoute;
