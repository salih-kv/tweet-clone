import { CgProfile } from "react-icons/cg";

const TweetInput = () => {
  return (
    <>
      <div className="dark:bg-secondary-bg bg-white shadow-sm h-36 rounded-2xl p-4 flex gap-2">
        <div>
          <CgProfile className="w-8 h-8 md:w-12 md:h-12" />
        </div>
        <div className="w-full">
          <input
            placeholder="What's happening?"
            className="p-3 rounded-lg w-full bg-off-white dark:bg-tertiary-bg dark:text-white border  border-gray-700 placeholder:text-sm placeholder:text-gray-500 outline-none"
          />
        </div>
      </div>
    </>
  );
};

export default TweetInput;
