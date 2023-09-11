import Header from "../components/Header";
import ProfileCard from "../components/ProfileCard";
import TweetInput from "../components/TweetInput";
import { Tweet } from "../components/Tweet";
import { useContext, useEffect, useState } from "react";
import LoginContext from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
import { DarkThemeToggle } from "../components/DarkThemeToggle";

const Home = () => {
  const [token] = useState(localStorage.getItem("userToken"));
  const { loggedIn, setLoggedIn } = useContext(LoginContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setLoggedIn(true);
    }
  }, [token, loggedIn, setLoggedIn, navigate]);

  const tweets = [
    {
      id: 1,
      name: "Edward Patrick",
      username: "edwardpatrick",
      content:
        "Laughter is the best medicine, except when you have diarrhea, then Pepto is definitely the best medicine.",
    },
    {
      id: 2,
      name: "Tech Crunch",
      username: "techcrunch",
      content:
        "A new computing era has begun. Companies worldwide are transitioning from general-purpose to accelerated computer and generative AI. - Jensen Huang, @nvidia Founder and CE Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, dolores?",
    },
  ];

  return (
    <div className="dark:bg-primary-bg dark:text-off-white bg-off-white text-black-500 w-full min-h-screen px-2 pb-4 md:px-8 ">
      <div className="max-w-6xl m-auto">
        <Header />

        <main className="flex md:gap-4 w-full">
          <div>
            <ProfileCard />
          </div>
          <div className="w-full flex flex-col gap-4">
            <TweetInput />
            {tweets ? (
              tweets.map((tweet) => <Tweet {...tweet} key={tweet.id} />)
            ) : (
              <></>
            )}
          </div>
        </main>
      </div>
      <DarkThemeToggle />
    </div>
  );
};

export default Home;
