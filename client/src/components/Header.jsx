import { Link, useNavigate } from "react-router-dom";

import { BsGrid3X3GapFill, BsTwitter } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { GoHomeFill, GoTriangleDown } from "react-icons/go";
import { LuMessagesSquare } from "react-icons/lu";
import { MdNotifications } from "react-icons/md";
import { useContext, useState } from "react";
import LoginContext from "../context/LoginContext";
import { DarkThemeToggle } from "./DarkThemeToggle";

const Header = () => {
  const [dropdownToggle, setDropdownToggle] = useState(false);
  const { setLoggedIn } = useContext(LoginContext);

  const navigate = useNavigate();

  return (
    <header className="bg-white dark:bg-primary-bg flex justify-between items-center text-2xl py-4 px-2 mb-2 sticky top-0 z-50">
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
            <GoHomeFill />
            <span className="text-xs font-semibold text-[#06141D] hidden">
              Home
            </span>
          </Link>
          <Link to="/messages">
            <LuMessagesSquare />
          </Link>
          <Link to="/notifications">
            <MdNotifications />
          </Link>
          <DarkThemeToggle />
        </div>
        <div className="flex items-center gap-4 sm:gap-8 sm:pl-4 sm:border-l-2 sm:border-[#14222B]">
          <div className="sm:dark:bg-[#2A3843] p-2 rounded-3xl flex items-center gap-2 relative border">
            <Link to="/profile" className="sm:flex items-center gap-2">
              <CgProfile />
              <span className="text-sm sm:block hidden">Yeremias NJ</span>
            </Link>
            <button
              onClick={() => {
                setDropdownToggle((prev) => !prev);
              }}
            >
              <GoTriangleDown />
            </button>
            {dropdownToggle && (
              <div className="absolute right-0 top-10 z-10">
                <div
                  className=" end-0 mt-2 w-40 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg dark:divide-gray-800 dark:border-gray-800 dark:bg-[#2A3843]"
                  role="menu"
                >
                  <div className="p-2">
                    <Link to="/profile/edit">
                      <p className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300">
                        Edit Profile
                      </p>
                    </Link>
                  </div>

                  <div className="p-2">
                    <button
                      type="submit"
                      className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-600/10"
                      role="menuitem"
                      onClick={() => {
                        localStorage.removeItem("userToken");
                        setLoggedIn((prev) => ({ ...prev, token: false }));
                        navigate("/login");
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Link>
            <BsGrid3X3GapFill />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
