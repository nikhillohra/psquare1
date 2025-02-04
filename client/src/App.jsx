import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import Signup from "./Pages/Signup";
import LoginPage from "./Pages/LoginPage";
import Dashboard from "./Pages/Dashboard";

const App = () => {
  return (
    <>
      {/* Global Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      
      <Router>
        <Routes>
          {/* Default Route to Signup */}
          <Route path="/" element={<Signup />} />
          {/* Login Page Route */}
          <Route path="/login" element={<LoginPage />} />
          {/* Dashboard Page Route */}
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </Router>
    </>
  );
};

export default App;
