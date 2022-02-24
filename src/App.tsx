import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useRoutes,
} from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import store, { RootState } from "./redux/store";
import Homepage from "./views/Homepage";
import DetailService from "./views/DetailService";
import {Admin} from "./views/admin/Admin";
import ProtectedRoute from "./components/rounting/ProtectedRoute";
import Profile from "./views/Profile";
import Loading from "./views/Loading";

const App: React.FC = () => {
  useEffect(() => {
    console.log("hello App");
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/detailService" element={<DetailService />} />
          <Route path="/loading" element={<Loading />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path = '/admin/*' element={<Admin/>}/>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
