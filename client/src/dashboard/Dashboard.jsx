import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../providers/Context";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { Link, NavLink, Outlet } from "react-router";
import { dashbordLinks } from "../utilities/DashbordLinks";

import Aos from "aos";
import HotToster from "../components/HotToster";
import { FaSignOutAlt } from "react-icons/fa";
import ThemeToggler from "../components/ThemeToggler";

export default function Dashboard() {
  const { user, loading, signOutUser } = useContext(FirebaseContext);
  const [isIcon, setIsIcon] = useState(false);

  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
      mirror: false,
    });
  }, []);

  return (
    <>
      <nav className="flex fixed z-50 justify-between items-center h-14 pr-3 md:pr-14 w-full bg-gradient-to-l from-[#445275] to-[#2f3449] shadow-sm text-white">
        <div className="flex items-center gap-4">
          <div
            onClick={() => setIsIcon(!isIcon)}
            className="text-2xl font-semibold size-14 cursor-pointer flex justify-center items-center hover:bg-secondary hover:text-primary"
          >
            {isIcon ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}
          </div>
          <div
            className={`flex justify-start items-center font-semibold text-xl md:text-2xl gap-2 `}
          >
            <Link to={"/"}>Share Bite</Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {loading ? (
            <span className="loading loading-dots loading-sm" />
          ) : (
            <>
              <img
                className="size-8 md:size-10 rounded-full border-2 border-white"
                src={user.photoURL}
                alt=""
              />
              <div className="flex flex-col text-white">
                <p className="text-sm md:text-base font-semibold">
                  {user.displayName}
                </p>
                <p className="text-xs">{user.email}</p>
              </div>
            </>
          )}
        </div>
      </nav>
      <HotToster />
      <main className="w-full flex gap-0 pt-14">
        <div className="hidden md:flex flex-col w-auto bg-primary text-white transition-all duration-500 ease-in-out min-h-dvh">
          {dashbordLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                `w-full flex justify-start items-center gap-2 text-lg font-semibold transition-all duration-300 ease-in-out 
                  ${
                    isActive ? "bg-secondary text-white" : "hover:bg-secondary"
                  }`
              }
            >
              <span
                className={`text-sm w-14 h-10 flex justify-center items-center`}
              >
                {link.icon}
              </span>
              <span
                className={`${
                  isIcon ? "hidden" : "flex"
                } pr-4 transition-all duration-500 ease-in-out`}
              >
                {link.name}
              </span>
            </NavLink>
          ))}
          <div className="flex justify-center items-center pt-20">
            <ThemeToggler />
          </div>
          <button
            onClick={signOutUser}
            className="flex items-center justify-center gap-2 text-lg font-semibold transition-all duration-300 ease-in-out hover:bg-secondary py-2 m-3 rounded-full cursor-pointer"
          >
            <FaSignOutAlt /> <span
                className={`${
                  isIcon ? "hidden" : "flex"
                } pr-4 transition-all duration-500 ease-in-out`}
              >
                Sign Out
              </span>
          </button>
        </div>
        <div
          className={`absolute top-0 left-0 z-45 md:hidden w-2/3 h-dvh ${
            isIcon ? "flex" : "hidden"
          } bg-primary text-white flex flex-col pt-14`}
        >
          {dashbordLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                `w-full flex justify-start items-center gap-2 font-semibold transition-all duration-300 ease-in-out 
                  ${
                    isActive ? "bg-secondary text-white" : "hover:bg-secondary"
                  }`
              }
            >
              <span
                className={`text-sm w-14 h-10 flex justify-center items-center`}
              >
                {link.icon}
              </span>
              <span
                className={`flex pr-4 transition-all duration-500 ease-in-out`}
              >
                {link.name}
              </span>
            </NavLink>
          ))}

          <div className="flex justify-center items-center pt-10">
            <ThemeToggler />
          </div>
          <button
            onClick={signOutUser}
            className="flex items-center justify-center gap-2 text-lg font-semibold transition-all duration-300 ease-in-out hover:bg-secondary py-2 m-3 rounded-full cursor-pointer"
          >
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
        <div className="flex-1 px-2">
          <Outlet />
        </div>
      </main>
    </>
  );
}
