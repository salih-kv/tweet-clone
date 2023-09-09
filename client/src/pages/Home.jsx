import Header from "../components/Header";
import ProfileCard from "../components/ProfileCard";
import TweetInput from "../components/TweetInput";
import { Tweet } from "../components/Tweet";
import { useContext, useEffect, useState } from "react";
import LoginContext from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [token] = useState(localStorage.getItem("userToken"));
  const { loggedIn, setLoggedIn } = useContext(LoginContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setLoggedIn(true);
    }
  }, [token, loggedIn, setLoggedIn, navigate]);

  return (
    <div className="bg-[#06141D] text-white w-full min-h-screen transition-all px-2 md:px-8 pb-4">
      <div className="max-w-6xl m-auto">
        <Header />

        <main className="flex md:gap-4 w-full">
          <div>
            <ProfileCard />
          </div>
          <div className="w-full flex flex-col gap-4">
            <TweetInput />
            <Tweet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
