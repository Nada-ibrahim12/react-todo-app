import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "./components/Navbar/index";
import SignUp from "./components/SignUp/index";
import Login from "./components/Login/index";
import Home from "./components/index";
import TodoApp from "./components/TodoApp/index";
import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export default function App() {
  const [userData, setUserData] = useState(null);

  function saveDataUser() {
    const token = localStorage.getItem("Token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserData(decoded);
    }
  }

  function logOut() {
    setUserData(null);
    localStorage.removeItem("Token");
    localStorage.removeItem("currentUser"); 
    Navigate("/login");
  }

  function ProtectedRoute(props) {
    if (localStorage.getItem("Token") == null) {
      return <Navigate to={"/login"} />;
    } else {
      return props.children;
    }
  }
  return (
    <BrowserRouter>
      <div>
        <NavBar userData={userData} logOut={logOut} />
        <div className="container-fluid">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/welcomePage"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/register" element={<SignUp />} />
            <Route
              path="/login"
              element={<Login saveDataUser={saveDataUser} />}
            />
            <Route
              path="/todo"
              element={
                <ProtectedRoute>
                  <TodoApp />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<h1>Not Found</h1>}></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
