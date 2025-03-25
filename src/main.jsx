import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Login from "./components/shared/Login";
import "./index.css";
import Registro from "./components/shared/Registro";

function MainRouter() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(auth);
  }, []);

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/" element={<Login setAuth={setIsAuthenticated} />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/Registro" element={<Registro />} />
          </>
        ) : (
          <>
            <Route path="/menu" element={<App />} />
            <Route path="*" element={<Navigate to="/menu" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MainRouter />
  </React.StrictMode>
);
