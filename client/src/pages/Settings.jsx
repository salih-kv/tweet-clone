import { Link, Outlet } from "react-router-dom";
import { BsChevronRight } from "react-icons/bs";
import Header from "../components/Header.jsx";
import { useEffect, useState } from "react";

const Settings = () => {
  
  return (
    <div className="dark:bg-primary-bg dark:text-white bg-lightPrimary">
      <div className="max-w-6xl m-auto">
        <Header />
        <section className="flex gap-24 mt-8">
          {/* Left Nav */}
          <div className="w-[500px] h-screen">
            <SettingsNav />
          </div>
          {/* Right */}
          <div className="dark:text-gray-500 w-full min-h-screen flex justify-between">
            <Outlet />
          </div>
        </section>
      </div>
    </div>
  );
};

const SettingsNav = () => {
 
  const [activeTabIndex, setActiveTabIndex] = useState(0);
 
  useEffect(() => {
    let linknum=settingsLinks.findIndex(link=>window.location.pathname==link.to);
    setActiveTabIndex(linknum)
  }, []); 
  
  return (
    <div className="list-none flex flex-col gap-2 border-r dark:border-secondary-bg">
      {settingsLinks.map((link,idx) => (
        <div
          key={link.to}
          
          className={`border-b  dark:border-secondary-bg border-b-gray-200 py-6 shadow-sm flex items-center justify-between`}
          
        >
          <Link  to={link.to}  style={
            idx === activeTabIndex
              ? {color:"#1DA1F2"}
              : {color:"black"}
          }onClick={() => setActiveTabIndex(idx)}>{link.label}</Link>
          <span>
            <BsChevronRight style={
            idx === activeTabIndex
              ? {color:"#1DA1F2"}
              : {color:"black"}
          } className="font-bold mr-4" />
          </span>
        </div>
      ))}
    </div>
  );
};

const settingsLinks = [
  { to: "/settings/account", label: "Account Settings" },
  { to: "/settings/security", label: "Security" },
  { to: "/settings/notification", label: "Notification" },
];

export default Settings;
