import React, { useContext, useState } from 'react'
import { FirebaseContext, ScrollContext } from '../providers/Context'
import { navLinks, privateLinks } from '../utilities/navlinks'
import { Link, NavLink } from 'react-router'
import ThemeToggler from '../components/ThemeToggler'
import { IoCloseOutline } from 'react-icons/io5'
import { CgMenuRightAlt } from 'react-icons/cg'
import { avatarError } from '../utilities/myplaceholder'
import { IoIosArrowDropdown } from 'react-icons/io'

function Navbar() {
  const {isScrolled} = useContext(ScrollContext);
  const { user, dbUser, loading, signOutUser} = useContext(FirebaseContext);

  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <nav className='w-full fixed bg-transparent z-50'>
      {/* Large Device Navbar */}
      <section
      className={`hidden md:grid grid-cols-4 py-2 justify-center items-center text-white mx-auto transition-all duration-100 ease-in-out bg-gradient-to-l from-[#445275] to-[#2f3449] shadow-sm
      ${isScrolled ? 'w-full h-16 rounded-none mt-0 px-10' : 'w-11/12 rounded-full mt-8 px-2'}`}>
      {/* Site Title */}
      <div className={`flex justify-start items-center font-semibold text-2xl gap-2 
        ${isScrolled ? 'pl-0' : 'pl-3'}`}> 
        <img className='size-7 brightness-0 invert animate-pulse' src="./logo.svg" alt="" />
        <Link to={'/'} >Share Bite</Link>
        </div>
        {/* Nav Link */}
      <div className='col-span-2 flex justify-center items-center gap-3'>
      {
        navLinks.map(link => 
        <NavLink
        key={link.name} 
        to={link.path}
        className={({ isActive }) =>
        `relative px-4 transition-all duration-300 ease-in-out flex justify-center items-center
        py-1 rounded-full border-2 hover:border-white hover:bg-white/10
        ${isActive ? 'border-white' : 'border-transparent'}`}>
        {link.name}
        </NavLink>)
      }
      {
        user && 
        <>
        <button className="relative px-4 transition-all duration-300 ease-in-out cursor-pointer flex justify-center gap-2 items-center py-1 rounded-full border-2 hover:border-white hover:bg-white/10 border-transparent" popoverTarget="popover-1" style={{ anchorName: "--anchor-1" }}>Manage <IoIosArrowDropdown size={20} /></button>
        
        <div className="dropdown menu mt-4 w-52 min-w-50 rounded-box bg-gradient-to-l from-[#445275] to-[#2f3449] shadow-sm py-4" popover="auto" id="popover-1" style={{ positionAnchor: "--anchor-1" } }>
  {
    privateLinks.map(link => 
      <NavLink
      key={link.name} 
      to={link.path}
      className={({ isActive }) =>
      `relative px-4 transition-all duration-300 ease-in-out flex items-center
      py-1 rounded-full border-2 hover:border-white hover:bg-white/10 mb-1
      ${isActive ? 'border-white' : 'border-transparent'}`}>
      {link.name}
      </NavLink>)
  }
  
</div>
        </>
      }<ThemeToggler/>
      </div>
      {/* User Photo & Theme Toggler */}
      <div className='flex justify-end items-center gap-2'>
        {
        loading ?
        (
        <div className='w-10 h-10 flex justify-center items-center'>
        <span className="loading loading-dots loading-sm"/></div>
        )
        :
        (
        user ?
        <div className="dropdown dropdown-end">
        <img
        tabIndex={0} role="button"
        data-tooltip-id="my-tooltip"
        data-tooltip-content={user?.displayName}
        className="w-10 h-10 rounded-full object-cover border-2 border-white cursor-pointer"
        src={user?.photoURL} alt={user?.displayName} onError={avatarError} />
        <div tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 min-w-50 p-2  shadow-sm flex flex-col gap-1 text-accent items-center mt-2">
        <span className='font-semibold pt-3 text-xl'>
          {user?.displayName ? user?.displayName : user?.displayName}
        </span>
        <span className='text-sm opacity-70'>
          {user?.email ? user?.email : user?.email}
        </span>
        <Link to='/dashboard' className="text-sm font-semibold">
        Dashboard <span aria-hidden="true">&rarr;</span>
        </Link>
        <button onClick={signOutUser} className='btn w-full mt-3 btn-secondary'>Sign Out</button>
        </div>
        </div>
        :
        <div className='flex justify-center items-center gap-0'>
        <NavLink
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Join Our Community" 
        to='/register'
        className={({ isActive }) =>
        `relative w-fit h-8 px-4 transition-all duration-300 ease-in-out flex justify-center items-center
        bg-[#00bfe7] rounded-l-full border-2 hover:border-white py-1 hover:bg-white/10
        ${isActive ? 'border-white' : 'border-transparent'}`
        } >REGISTER</NavLink>
        <NavLink
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Login to Account" 
        to='/signin'
        className={({ isActive }) =>
        `relative w-fit h-8 px-4 transition-all duration-300 ease-in-out flex justify-center items-center
        bg-[#00bfe7] rounded-r-full border-2 hover:border-white py-1 hover:bg-white/10
        ${isActive ? 'border-white' : 'border-transparent'}`
        } >SIGN IN</NavLink>
        </div>
        )
        }
      
      </div>
    </section>

    {/* Medium Device Navbar */}
    <section className={`flex md:hidden py-2 justify-between items-center mx-auto transition-all duration-100 ease-in-out bg-gradient-to-l from-[#445275] to-[#2f3449] shadow-sm px-2
      ${isScrolled ? 'w-full h-16 rounded-none mt-0' : 'w-11/12 rounded-full mt-5'}`}>
      <div 
      className="flex justify-start items-center font-semibold text-xl pl-1 gap-2 text-white">
        <img className='size-6 brightness-0 invert animate-pulse' src="./logo.svg" alt="" />
        <Link to={'/'} >Share Bite</Link>
      </div>
      
      <div className='flex justify-end items-center gap-2'>
        <button 
        onClick={() => setOpenDrawer(true)}
        className='flex justify-center items-center w-10 h-10 text-2xl text-white'>
        <CgMenuRightAlt />
        </button>
        <div className={`w-full h-dvh bg-base-100 absolute top-0 left-0 z-45 py-6 px-3
        ${openDrawer ? 'translate-x-0' : 'translate-x-full'}
        transition-all duration-500 ease-in-out`}>
          <div className='flex justify-between items-center px-3 pb-6'>
            <span><ThemeToggler/></span>
            <span 
            onClick={() => setOpenDrawer(false)}
            className='flex justify-center items-center size-10 text-3xl opacity-80'>
            <IoCloseOutline />
            </span>

          </div>
  
        <div
        onClick={() => setOpenDrawer(false)}
        className='flex flex-col items-center justify-between h-full'>
          {
            loading ?
            (
            <div className='w-10 h-10 flex justify-center items-center'>
            <span className="loading loading-dots loading-sm"/></div>
            ) : (
              user ? (
                <div className='rounded-md shadow-sm border-[1px] border-secondary p-3 flex items-center gap-3 w-full'>
                <img
                className="w-18 h-18 rounded-full object-cover border-2 border-secondary p-1"
                src={user?.photoURL} alt={dbUser?.displayName} />
                <div className='flex flex-col gap-1'>
                <span className='font-semibold text-xl'>
                {dbUser?.displayName ? dbUser?.displayName : user?.displayName}
                </span>
                <span className='text-sm opacity-70'>
                {dbUser?.email ? dbUser?.email : user?.email}
                </span>
                <Link to='/profile' className="text-sm font-semibold">
                Go to Profile <span aria-hidden="true">&rarr;</span>
                </Link>
                </div>
                </div>
              ) 
              : (
                <div className='w-full grid grid-cols-2 justify-center items-center gap-4 px-2'>
                  <Link to={'/signin'} className='btn btn-primary'>Login</Link>
                  <Link to={'/register'} className='btn btn-primary'>Register</Link>
                </div>
              )
            )
          }

        <div className='flex-1 h-full w-full flex items-end pt-5 pr-2 flex-col'>
        {
        navLinks.map(link => 
        <NavLink
        key={link.name} 
        to={link.path}
        className={({ isActive }) =>
        `relative px-4 transition-all duration-300 ease-in-out flex justify-center items-center text-xl py-1 
        ${isActive ? 'text-secondary' : ''}`}>
        {link.name}
        </NavLink>)
      }
      {user &&
        privateLinks.map(link => 
          <NavLink
          key={link.name} 
          to={link.path}
          className={({ isActive }) =>
          `relative px-4 transition-all duration-300 ease-in-out flex justify-center items-center text-xl py-1
          ${isActive ? 'text-secondary' : ''}`}>
          {link.name}
          </NavLink>)
      }

        </div>
        </div>
        <div 
        className='flex gap-3 w-full absolute bottom-10 left-0 p-4 justify-end'>
        {
          user && <button onClick={signOutUser} className='btn flex-1 shadow-sm rounded-full btn-primary'>Sign Out</button>
        }
        
        </div>
        
        </div>
          
      </div>
    </section>
    </nav>
  )
}

export default Navbar
