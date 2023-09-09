import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

const ProfileCard = () => {
  return (
    <div className="bg-[#1B2730] max-w-[360px] w-[280px] rounded-2xl flex flex-col items-center md:block hidden ">
      <div className="h-25 w-full relative mb-8">
        <img
          className="rounded-t-2xl h-full w-full"
          src="https://template.canva.com/EAENvp21inc/1/0/1600w-qt_TMRJF4m0.jpg"
          alt=""
        />
        <CgProfile className=" w-20 h-20 absolute left-0 right-0 m-auto -bottom-10" />
      </div>
      <div>
        <article className="text-center flex flex-col gap-1 lg:px-8 py-6">
          <h1 className="text-xl lg:text-2xl font-medium">Yeremias NJ</h1>
          <p className="text-[#788694] text-sm lg:text-base">@notojoyoo</p>
          <p className="text-[#dae1e7] text-sm lg:text-base">
            ✨Penting gak Pentig yang penting Posting✨
          </p>
        </article>
        <div className="flex justify-around items-center border-y-[2px] p-4 border-[#1d313e]">
          <div className="flex flex-col justify-center items-center">
            <h2 className="lg:text-xl">6,664</h2>
            <h4 className="text-[#788694] text-sm lg:text-base">Following</h4>
          </div>
          <div className="w-[2px] h-12 bg-[#1d313e]"></div>
          <div className="flex flex-col justify-center items-center">
            <h2 className="lg:text-xl">9,991</h2>
            <h4 className="text-[#788694] text-sm lg:text-base">Followers</h4>
          </div>
        </div>
      </div>
      <div className="p-6">
        <Link to="/profile">
          <h4 className="text-[#1DA1F2] text-center text-sm lg:text-base">
            My Profile
          </h4>
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
