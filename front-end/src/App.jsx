import React, { useState } from "react";
import { Register } from "./components/Register";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <React.StrictMode>
      {/* <Register /> */}
      <AuthProvider>
        <Login></Login>
      </AuthProvider>
    </React.StrictMode>
  );
}

export default App;
