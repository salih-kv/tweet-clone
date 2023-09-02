import { AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaRetweet } from "react-icons/fa";
import { IoIosShare } from "react-icons/io";

export const Tweet = () => {
  return (
    <div className="bg-[#1B2730] rounded-2xl p-4 flex gap-4">
      <div>
        <CgProfile className="w-8 h-8 md:w-12 md:h-12" />
      </div>
      <div className="w-full flex flex-col gap-1">
        <h2 className="text-sm md:text-lg">
          TechCrunch{" "}
          <span className="text-[#788694] text-xs md:text-sm">@techcrunch</span>
        </h2>
        <p className="text-xs text-[#788694]">Few minutes ago</p>
        <p className="my-4 text-sm md:text-base">
          "A new computing era has begun. Companies worldwide are transitioning
          from general-purpose to accelerated computer and generative AI". -
          Jensen Huang, @nvidia Founder and CEO
        </p>
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-1">
            <AiOutlineHeart className="bg-red-500 w-6 h-6 p-1 rounded-full" />
            <FaRetweet className="bg-green-500 w-6 h-6 p-1 rounded-full" />
            <IoIosShare className="bg-blue-500 w-6 h-6 p-1 rounded-full" />
            <p className="text-[#788694] text-xs md:text-sm font-medium ml-1">
              135k
            </p>
          </div>
          <div>
            <p className="text-[#788694] text-xs md:text-sm font-medium">
              2.7k Comments
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center gap-2">
          <div className="bg-[#28343E] text-white text-2xl rounded-lg flex items-center justify-center gap-2 py-3 w-full">
            <AiOutlineHeart />{" "}
            <span className="text-sm hidden md:flex">Like</span>
          </div>
          <div className="bg-[#28343E] text-white text-2xl rounded-lg flex items-center justify-center gap-2 py-3 w-full">
            <FaRetweet />{" "}
            <span className="text-sm hidden md:flex">Retweet</span>
          </div>
          <div className="bg-[#28343E] text-white text-2xl rounded-lg flex items-center justify-center gap-2 py-3 w-full">
            <AiOutlineComment />{" "}
            <span className="text-sm hidden md:flex">Comment</span>
          </div>
          <div className="border-2 border-[#28343E] rounded-lg p-3 h-full">
            <IoIosShare />
          </div>
        </div>
      </div>
    </div>
  );
};
