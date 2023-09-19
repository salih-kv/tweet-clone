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

function App() {
  const [loggedIn, setLoggedIn] = useState({
    token: localStorage.getItem("userToken") || false,
    data: undefined,
  });
  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          {/* if jwt present then only make access to this route */}
          <Route element={<ProtectedRoutes />}>
            <Route index element={<Home />} />
            <Route path="/profile">
              <Route index element={<Profile />} />
              <Route path="comments" element={<Home />} />
            </Route>
            <Route path="/profile/edit" element={<EditProfile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}

export default App;
