import React, { useEffect, useState } from "react";
import {BrowserRouter, BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Homepage from "./views/Homepage";
import DetailService from "./views/DetailService";
import {Admin} from "./views/admin/Admin";

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
          <Route path = '/admin/*' element={<Admin/>}/>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
