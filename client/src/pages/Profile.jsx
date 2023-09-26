import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import instance from "../axios/axios";
import Cookies from "js-cookie";

const Profile = () => {
  const [token] = useState(Cookies.get("userToken"));

  const userId = Cookies.get("userId");
  const [user, setUser] = useState();

  useEffect(() => {
    console.log(userId);
    if (token) {
      instance
        .post("/getUser", { userId })
        .then((res) => setUser(res.data))
        .catch((err) => console.log(err));
    }
  }, [token, userId]);

  return (
    <div className="bg-off-white text-black dark:bg-[#06141D] dark:text-white w-full min-h-screen transition-all px-2 md:px-8 pb-4">
      <div className="max-w-6xl m-auto">
        <Header />
        {/* profile */}
        <div className="bg-white dark:bg-[#1B2730] w-full rounded-2xl flex flex-col overflow-hidden relative">
          <div className="h-48 overflow-hidden">
            <img
              className="rounded-t-2xl w-full"
              src="https://template.canva.com/EAENvp21inc/1/0/1600w-qt_TMRJF4m0.jpg"
              alt=""
            />
          </div>
          <div className="absolute left-10 right-0 top-36">
            <div className=" w-32 h-32 bg-blue-300 rounded-full"></div>
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
              <p className="text-[#dae1e7] text-sm lg:text-base">undefined</p>
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
          <div className="p-6 flex justify-around">
            <h4>Tweets</h4>
            <h4>Comments</h4>
            <h4>Likes</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
