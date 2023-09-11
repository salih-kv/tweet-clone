import { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export const DarkThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.theme);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", theme);
    } else {
      localStorage.setItem("theme", theme);
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleDarkMode = () => {
    setTheme((prevDark) => {
      if (prevDark === "dark") {
        return "light";
      } else {
        return "dark";
      }
    });
  };

  return (
    <div className="absolute right-4 bottom-4 bg-primary-bg dark:bg-white rounded-lg">
      <button className="p-2" id="toggleDark" onClick={toggleDarkMode}>
        {theme === "light" ? (
          <MdLightMode className="text-white" />
        ) : (
          <MdDarkMode className="text-white dark:text-black" />
        )}
      </button>
    </div>
  );
};
