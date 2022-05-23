import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import Homepage from "./views/Homepage";
import DetailService from "./views/DetailService";
import { Admin } from "./views/admin/Admin";
import ProtectedRoute from "./components/rounting/ProtectedRoute";
import Profile from "./views/Profile";
import Loading from "./views/Loading";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import { AuthSync } from "./components/rounting/AuthSync";
import ScollToTop from "./components/rounting/ScollToTop";

const App: React.FC = () => {
  useEffect(()=>{
    document.title = "BK Service"
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <AuthSync>
          <Router>
            <ScollToTop />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route
                path="/detailService/:serviceId"
                element={<DetailService />}
              />
              <Route path="/loading" element={<Loading />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="/admin/*" element={<Admin />} />
            </Routes>
          </Router>
        </AuthSync>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Loading />
      </PersistGate>
    </Provider>
  );
};

export default App;
