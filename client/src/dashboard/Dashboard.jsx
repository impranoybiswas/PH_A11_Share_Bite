import React, { useContext, useState } from "react";
import { FirebaseContext } from "../providers/Context";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { Link, NavLink, Outlet } from "react-router";
import { dashbordLinks } from "../utilities/DashbordLinks";

export default function Dashboard() {
  const { user, dbUser, loading, signOutUser } = useContext(FirebaseContext);
  const [isIcon, setIsIcon] = useState(false);

  return (
    <>
      <nav className="flex justify-between items-center h-14 pr-14 w-full bg-gradient-to-l from-[#445275] to-[#2f3449] shadow-sm text-white">
        <div className="flex items-center gap-4">
          <div
            onClick={() => setIsIcon(!isIcon)}
            className="text-2xl font-semibold size-14 cursor-pointer flex justify-center items-center hover:bg-secondary hover:text-primary"
          >
            {isIcon ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}
          </div>
          <div
            className={`flex justify-start items-center font-semibold text-2xl gap-2 `}
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
                className="size-10 rounded-full border-2 border-white"
                src={user.photoURL}
                alt=""
              />
              <div className="flex flex-col text-white">
                <p className="font-semibold">{user.displayName}</p>
                <p className="text-xs">{user.email}</p>
              </div>
            </>
          )}
        </div>
      </nav>
      <main className="w-full flex gap-0">
        <div className="flex flex-col w-auto bg-primary text-white transition-all duration-500 ease-in-out">
          {dashbordLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                `w-full flex justify-start items-center gap-2 text-base md:text-lg font-semibold transition-all duration-300 ease-in-out 
                  ${
                    isActive ? "bg-secondary text-white" : "hover:bg-secondary"
                  }`
              }
            >
              <span className={`text-sm w-14 h-10 flex justify-center items-center`}>
                {link.icon}
              </span>
              <span className={`${isIcon ? "hidden" : "flex"} pr-4 transition-all duration-500 ease-in-out`}>
                {link.name}
              </span>
            </NavLink>
          ))}
        </div>
        <div>
            <Outlet/>
        </div>
      </main>
    </>
  );
}
