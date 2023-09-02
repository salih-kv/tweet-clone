import { Link } from "react-router-dom";

import { BsGrid3X3GapFill, BsTwitter } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { GoHomeFill } from "react-icons/go";
import { LuMessagesSquare } from "react-icons/lu";
import { MdNotifications } from "react-icons/md";

const Header = () => {
  return (
    <header className="flex justify-between items-center text-2xl py-4 px-2 mb-2">
      {/* left */}
      <div>
        <Link to="/">
          <BsTwitter className="text-3xl text-[#1DA1F2]" />
        </Link>
      </div>
      {/* right */}
      <div className="flex items-center sm:gap-8 gap-4">
        <div className="flex justify-around items-center sm:gap-8 gap-4">
          <Link to="/">
            <div className="md:flex gap-1 items-center bg-white text-[#1DA1F2] p-1 md:p-2 rounded-3xl">
              <GoHomeFill />
              <span className="text-xs font-semibold text-[#06141D] hidden">
                Home
              </span>
            </div>
          </Link>
          <Link to="/messages">
            <LuMessagesSquare />
          </Link>
          <Link to="/notifications">
            <MdNotifications />
          </Link>
        </div>
        <div className="flex items-center gap-4 sm:gap-8 sm:pl-4 sm:border-l-2 sm:border-[#14222B]">
          <Link to="/profile">
            <div className="sm:bg-[#2A3843] p-2 rounded-3xl sm:flex items-center gap-2">
              <CgProfile />
              <span className="text-sm sm:block hidden">Yeremias NJ</span>
            </div>
          </Link>
          <Link>
            <BsGrid3X3GapFill />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
