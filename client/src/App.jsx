import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import { useState } from "react";
import LoginContext from "./context/LoginContext.js";

function App() {

  const [loggedIn,setLoggedIn]=useState(false)
  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
    <BrowserRouter>
      <Routes>
      <Route index element={<Home />}/>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {/* if jwt present then only make access to this route */}
        <Route element={<ProtectedRoutes/>}>
        <Route path="/profile"  element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </LoginContext.Provider>
  );
}

export default App;

