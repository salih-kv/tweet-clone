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
    <div className="flex justify-center  items-center">
      <button className="" id="toggleDark" onClick={toggleDarkMode}>
        {theme === "light" ? <MdLightMode /> : <MdDarkMode />}
      </button>
    </div>
  );
};
