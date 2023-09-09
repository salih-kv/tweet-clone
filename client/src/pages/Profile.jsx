import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import LoginContext from "../context/LoginContext";

const Profile = () => {
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
        {/* profile */}
        <div className="bg-[#1B2730] w-full rounded-2xl flex flex-col overflow-hidden relative">
          <div className="h-48 overflow-hidden">
            <img
              className="rounded-t-2xl w-full"
              src="https://template.canva.com/EAENvp21inc/1/0/1600w-qt_TMRJF4m0.jpg"
              alt=""
            />
          </div>
          <div className="absolute left-10 right-0 top-36">
            <div className=" w-32 h-32 bg-green-200 rounded-full"></div>
          </div>
          <div className="lg:px-8 py-6 flex pt-28 flex-col gap-6 relative">
            <div className="absolute right-10 top-6">
              <Link to="/profile/edit">
                <button className="py-2 px-4 rounded-lg text-sm border border-slate-300 active:border-blue-500 active:text-blue-500">
                  Edit Profile
                </button>
              </Link>
            </div>
            <article className=" flex flex-col gap-1">
              <h1 className="text-xl lg:text-2xl font-medium">Yeremias NJ</h1>
              <p className="text-[#788694] text-sm lg:text-base">@notojoyoo</p>
              <p className="text-[#dae1e7] text-sm lg:text-base">
                ✨Penting gak Pentig yang penting Posting✨
              </p>
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
