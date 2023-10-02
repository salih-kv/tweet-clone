import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import instance from "../axios/axios";
import Cookies from "js-cookie";
import { Tweet } from "../components/Tweet";

const Profile = () => {
  const [token] = useState(Cookies.get("userToken"));
  const [toggleState, setToggleState] = useState(1);
  const userId = Cookies.get("userId");
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    if (token) {
      instance
        .post("/getUser", { userId })
        .then((res) => setUser(res.data))
        .catch((err) => console.log(err));

      instance
        .post("/getTweets",{userId:userId,forProfile:true})
        .then((res) => setTweets([...res.data]))
        .catch((err) => console.log(err));
    }
  }, [token, userId]);

  const tabs = ["Tweets", "Retweets", "Likes"];

  return (
    <div className="bg-off-white text-black dark:bg-[#06141D] dark:text-white w-full min-h-screen transition-all px-2 md:px-8 pb-4">
      <div className="max-w-6xl m-auto">
        <Header />
        <div className="bg-white dark:bg-[#1B2730] w-full rounded-t-2xl flex flex-col overflow-hidden relative">
          <div className="h-48 overflow-hidden">
            <img
              className="rounded-t-2xl w-full"
              src="https://template.canva.com/EAENvp21inc/1/0/1600w-qt_TMRJF4m0.jpg"
              alt=""
            />
          </div>
          <div className="absolute left-10 right-0 top-32">
            <div className="w-32 h-32 bg-blue-100 rounded-full border-4 border-white dark:border-secondary-bg">
              <img
                src={user?.avatar}
                alt="profile image"
                className="rounded-full"
              />
            </div>
          </div>
          <div className="lg:px-8 py-6 flex pt-28 flex-col gap-6 relative">
            <div className="absolute right-10 top-6">
              <Link to="/settings/account">
                <button className="py-2 px-4 rounded-lg text-sm border border-slate-300 active:border-blue-500 active:text-blue-500">
                  Edit Profile
                </button>
              </Link>
            </div>
            <article className=" flex flex-col gap-1">
              <h1 className="text-xl lg:text-2xl font-medium">{user?.fname}</h1>
              <p className="text-[#788694] text-sm lg:text-base">{`@${user?.username}`}</p>
              <p className="dark:text-[#dae1e7] text-slate-600 text-sm lg:text-base">{user?.bio}</p>
            </article>
            <div className="flex gap-6">
              <div className="flex gap-2">
                <h6>6,664</h6>
                <p className="text-[#788694]">Following</p>
              </div>
              <div className="flex gap-2">
                <h6>9,991</h6>
                <p className="text-[#788694]">Followers</p>
              </div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 text-center">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className={`cursor-pointer p-2  ${
                  toggleState === index + 1
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : ""
                }`}
                onClick={() => setToggleState(index + 1)}
              >
                {tab}
              </div>
            ))}
          </div>
        </div>
        <div>
          {toggleState === 1 &&
            tweets.map((tweet) => <Tweet tweet={tweet} key={tweet._id} />)}
          {toggleState === 2 && (
            <p className="text-center mt-16 text-slate-600">
              Your Retweets will show up here
            </p>
          )}
          {toggleState === 3 && (
            <p className="text-center mt-16 text-slate-600">
              Liked tweets will show up here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
