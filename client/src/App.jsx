import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route index element={<Home />}/>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {/* if jwt present then only make access to this route */}
        <Route element={<ProtectedRoutes/>}>
        <Route  element={<Profile />} path="/profile"/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
