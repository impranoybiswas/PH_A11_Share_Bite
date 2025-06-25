import React, { useContext } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { ThemeContext } from "../providers/Context";
import { Tooltip } from "react-tooltip";

function ThemeToggler() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <button
        data-tooltip-id="my-tooltip"
        data-tooltip-content={`Toggle ${theme === "light" ? "Dark" : "Light"}`}
        className="w-10 h-10 flex justify-center items-center text-2xl p-0 cursor-pointer transition-all duration-200 ease-in-out text-white"
        onClick={toggleTheme}
      >
        {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
      </button>
      <Tooltip id="my-tooltip" />
    </>
  );
}

export default ThemeToggler;
