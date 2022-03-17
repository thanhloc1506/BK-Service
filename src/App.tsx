import React, {useEffect} from "react";
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import {Provider} from "react-redux";
import {persistor, store} from "./redux/store";
import Homepage from "./views/Homepage";
import DetailService from "./views/DetailService";
import {Admin} from "./views/admin/Admin";
import ProtectedRoute from "./components/rounting/ProtectedRoute";
import Profile from "./views/Profile";
import Loading from "./views/Loading";
import EHomepage from "./views/enterprise/EHomePage";
import {PersistGate} from "redux-persist/integration/react";

const App: React.FC = () => {
  useEffect(() => {
    console.log("hello App");
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Router>
          <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/detailService" element={<DetailService/>}/>
            <Route path="/loading" element={<Loading/>}/>
            <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile/>
                  </ProtectedRoute>
                }
            />
            <Route path="/admin/*" element={<Admin/>}/>
            <Route path="/enterprise" element={<EHomepage/>}/>
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
