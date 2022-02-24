import React, { useEffect } from "react";
import { Route, useNavigate, Link, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { loadUser } from "../../redux/slices/auth";
import Loading from "../../views/Loading";

interface IProps {
  path: string;
  Component: React.ComponentType<any>;
}

const ProtectedRoute = ({ children }: any) => {
  const auth = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  if (auth.authLoading) {
    return <Loading />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
