import { Link, useNavigate } from "react-router-dom";

import { BsGrid3X3GapFill, BsTwitter } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { GoHomeFill, GoTriangleDown } from "react-icons/go";
import { LuMessagesSquare } from "react-icons/lu";
import { MdNotifications } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import LoginContext from "../context/LoginContext";
import { DarkThemeToggle } from "./DarkThemeToggle";
import Cookies from "js-cookie";
import instance from "../axios/axios";

const Header = () => {
  const [dropdownToggle, setDropdownToggle] = useState(false);
  const { setLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();
  const [token] = useState(Cookies.get("userToken"));
  const userId = Cookies.get("userId");
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    try {
      const response = await instance.get(`/searchUser/${searchQuery}`);
      setSearchResults((prev) => [...prev, response.data]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await instance.get(`/searchUser?q=${searchQuery}`);
        setSearchResults(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, [searchQuery]);

  useEffect(() => {
    if (token) {
      instance
        .post("/getUser", { userId })
        .then((res) => setUser(res.data))
        .catch((err) => console.log(err));
    }
  }, [token, userId]);

  return (
    <header className="bg-white dark:bg-primary-bg flex justify-between items-center text-2xl py-4 px-2 mb-2 sticky top-0 z-50">
      {/* left */}
      <div className="flex justify-start items-center gap-4 relative">
        <Link to="/">
          <BsTwitter className="text-3xl text-[#1DA1F2]" />
        </Link>
        <form onSubmit={searchSubmit}>
          <input
            type="text"
            className="rounded-xl w-60 bg-gray-50 dark:bg-secondary-bg text-base px-4 py-2 outline-none border dark:border-none"
            placeholder="# Explore"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        {searchResults.length > 0 && (
          <div className="absolute right-0 top-10 z-10">
            <div
              className=" end-0 mt-2 w-60 text-sm divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg dark:divide-gray-800 dark:border-gray-800 dark:bg-secondary-bg"
              role="menu"
            >
              {searchResults.map((result) => (
                <div className="p-2" key={result._id}>
                  {result.username}
                </div>
              ))}
            </div>
          </div>
        )}
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
          <div className="sm:dark:bg-[#2A3843] bg-gray-50 p-2 rounded-3xl flex items-center gap-2 relative border">
            <Link to="/profile" className="sm:flex items-center gap-2">
              <CgProfile />
              <span className="text-sm sm:block hidden">{user?.fname}</span>
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
                    <Link to="/settings/account">
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
                        Cookies.remove("userToken");
                        Cookies.remove("userId");
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
