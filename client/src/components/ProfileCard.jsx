import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import instance from "../axios/axios";

const ProfileCard = () => {
  const [token] = useState(Cookies.get("userToken"));

  const userId = Cookies.get("userId");
  const [user, setUser] = useState();

  // make it reusable
  useEffect(() => {
    if (token) {
      instance
        .post("/getUser", { userId })
        .then((res) => setUser(res.data))
        .catch((err) => console.log(err));
    }
  }, [token, userId]);
  return (
    <div className="dark:bg-secondary-bg bg-white-secondary max-w-[360px] w-[300px] rounded-md  flex flex-col items-center md:block max-md:hidden">
      <div className="h-20 w-full relative mb-8">
        <img
          className="rounded-t-md h-full w-full"
          src="https://template.canva.com/EAENvp21inc/1/0/1600w-qt_TMRJF4m0.jpg"
          alt=""
        />
        <div className=" w-20 h-20 bg-blue-300 rounded-full absolute left-0 right-0 m-auto -bottom-10"></div>
      </div>
      <div>
        <article className="text-center flex flex-col gap-1 lg:px-8 py-6">
          <h1 className="text-xl lg:text-2xl font-medium">{user?.fname}</h1>
          <p className="text-[#788694] text-sm lg:text-base">{`@${user?.username}`}</p>
          <p className="dark:text-[#dae1e7] text-slate-600 text-sm lg:text-base">
            undefined
          </p>
        </article>
        <div className="flex justify-around items-center border-y-[1px] p-4 dark:border-[#1d313e]">
          <div className="flex flex-col justify-center items-center">
            <h2 className="lg:text-xl">6,664</h2>
            <h4 className="text-[#788694] text-sm lg:text-base">Following</h4>
          </div>
          <div className="w-[1px] h-12 bg-gray-200 dark:bg-[#1d313e]"></div>
          <div className="flex flex-col justify-center items-center">
            <h2 className="lg:text-xl">9,991</h2>
            <h4 className="text-[#788694] text-sm lg:text-base">Followers</h4>
          </div>
        </div>
      </div>
      <div className="p-6">
        <Link to="/profile">
          <h4 className="text-blue-500 text-center text-sm lg:text-base">
            My Profile
          </h4>
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
