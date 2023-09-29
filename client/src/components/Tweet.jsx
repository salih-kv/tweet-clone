import { AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import { FaRetweet } from "react-icons/fa";
import { IoIosShare } from "react-icons/io";

export const Tweet = ({ tweet }) => {
  const icons = [
    { Icon: AiOutlineHeart, label: "Like" },
    { Icon: FaRetweet, label: "Retweet" },
    { Icon: AiOutlineComment, label: "Comment" },
  ];

  return (
    <div className="dark:bg-secondary-bg bg-white-secondary border-y-[.5px] dark:border-primary-bg p-4 flex gap-4">
      <div>
        <img
          // src={}
          alt=""
          className="w-8 h-8 object-cover md:w-12 md:h-12 rounded-full"
        />
      </div>
      <div className="w-full flex flex-col gap-1">
        <h2 className="text-sm md:text-lg">
          {} <span className="text-[#788694] text-xs md:text-sm">{}</span>
        </h2>
        <p className="text-xs text-[#788694]">Few minutes ago</p>
        <p className="my-4 text-sm md:text-base">{tweet?.userTweet}</p>
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-1">
            {icons.map(({ Icon, label }) => (
              <div key={label} className={`w-6 h-6 p-1 rounded-full`}>
                <Icon />
              </div>
            ))}
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
          {icons.map(({ Icon, label }) => (
            <button
              key={label}
              className={`text-2xl rounded-lg flex items-center justify-center gap-2 py-3 w-full border dark:border-secondary-bg dark:hover:border-blue-500 hover:border-blue-500 dark:bg-tertiary-bg dark:text-white`}
            >
              <Icon /> <span className="text-sm hidden md:flex">{label}</span>
            </button>
          ))}
          <button className="border dark:border hover:border dark:hover:border-blue-500 hover:border-blue-500 dark:border-tertiary-bg rounded-lg p-3 h-full">
            <IoIosShare />
          </button>
        </div>
      </div>
    </div>
  );
};
