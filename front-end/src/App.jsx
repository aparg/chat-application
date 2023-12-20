import React, { useState } from "react";
import { Register } from "./components/Register";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Layout from "./Layouts/Layout.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import MainPage from "./components/MainPage/MainPage.jsx";
import "./App.css";
import { Route, Routes } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <React.StrictMode>
      <div className="h-screen w-screen bg-cream flex justify-center items-center">
        <AuthProvider>
          {/* <MainPage /> */}
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/" element={<RequireAuth />}>
                <Route path="/message" element={<MainPage />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </div>
    </React.StrictMode>
  );
}

export default App;
