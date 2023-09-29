import Header from "../components/Header";
import ProfileCard from "../components/ProfileCard";
import TweetInput from "../components/TweetInput";
import { Tweet } from "../components/Tweet";
import { useContext, useEffect, useState } from "react";
import LoginContext from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import instance from "../axios/axios";

const Home = () => {
  const [tweets, setTweets] = useState([]);

  const [token] = useState(Cookies.get("userToken"));
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const userId = Cookies.get("userId");

  const navigate = useNavigate();

  useEffect(() => {
    // ! create a new endpoint to fetch all tweets

    // instance
    //   .post("/getTweets")
    //   .then((res) => setTweets([...res.data.data]))
    //   .catch((err) => console.log(err));
    !loggedIn.token && navigate("/login");
  }, [token, loggedIn, setLoggedIn, navigate, userId, tweets]);

  return (
    <div className="dark:bg-primary-bg dark:text-off-white text-black-500 w-full min-h-screen px-2 pb-4 md:px-8 ">
      <div className="max-w-6xl m-auto">
        <Header />
        <main className="flex md:gap-4 w-full">
          <div>
            <ProfileCard />
          </div>
          <div className="w-full flex flex-col">
            <TweetInput />
            {tweets?.map((tweet) => (
              <Tweet tweet={tweet} key={tweet._id} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
