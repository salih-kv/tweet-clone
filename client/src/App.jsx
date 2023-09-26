import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import Profile from "./pages/Profile.jsx";
import { useState } from "react";
import LoginContext from "./context/LoginContext.js";
import EditProfile from "./pages/EditProfile.jsx";
import NotFound from "./pages/NotFound.jsx";
import Security from "./pages/Security.jsx";
import Notifications from "./pages/Notifications.jsx";
import Settings from "./pages/Settings.jsx";
import Cookies from "js-cookie";

function App() {
  const [loggedIn, setLoggedIn] = useState({
    token: Cookies.get("userToken") || false,
    data: undefined,
  });
  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route index element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />}>
              <Route path="account" element={<EditProfile />} />
              <Route path="security" element={<Security />} />
              <Route path="notification" element={<Notifications />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}

export default App;
