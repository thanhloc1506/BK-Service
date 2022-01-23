import React, { useEffect } from "react";
import { Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { loadUser } from "../../redux/slices/auth";

interface IProps {
  path: string;
  component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<IProps> = ({
  component: Component,
  ...rest
}) => {
  const auth = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  if (auth.authLoading) {
    return <div className="spinner-container">Loading... </div>;
  } else {
    return (
      <Route
        {...rest}
        path="*"
        element={(prop: any) =>
          auth.isAuthenticated === true ? (
            <>
              <Component {...rest} {...prop} />
            </>
          ) : (
            <Navigate to="/" />
          )
        }
      />
    );
  }
};

export default ProtectedRoute;
