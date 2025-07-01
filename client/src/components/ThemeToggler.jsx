import React, { useContext } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { ThemeContext } from "../providers/Context";
import { Tooltip } from "react-tooltip";

function ThemeToggler() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      data-tooltip-id="my-tooltip"
      data-tooltip-content={`Toggle ${
        theme === "light" ? "Dark" : "Light"
      } Mode`}
      onClick={toggleTheme}
      className="relative w-12 h-7 flex items-center rounded-full bg-base-300 p-1 transition-all duration-300 ease-in-out cursor-pointer"
    >
      <div
        className={`absolute left-1 top-1 size-5 rounded-full flex items-center justify-center text-white transition-all duration-300
        ${
          theme === "dark"
            ? "translate-x-5 bg-secondary"
            : "translate-x-0 bg-primary"
        }`}
      >
        {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
      </div>
    </button>
  );
}

export default ThemeToggler;
