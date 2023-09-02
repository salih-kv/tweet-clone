import { CgProfile } from "react-icons/cg";

const TweetInput = () => {
  return (
    <div className="bg-[#1B2730] h-36 rounded-2xl p-4 flex gap-2">
      <div>
        <CgProfile className="w-8 h-8 md:w-12 md:h-12" />
      </div>
      <div className="w-full">
        <input
          className="p-3 rounded-lg w-full bg-[#28343E] text-white border  border-gray-700 placeholder:text-sm placeholder:text-gray-500"
          placeholder="What's happening?"
        />
        <div></div>
      </div>
    </div>
  );
};

export default TweetInput;
