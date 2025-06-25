import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import React from 'react'
import { navLinks, privateLinks } from '../utilities/navlinks'
import { Link, NavLink } from 'react-router'
import { FaAppStore, FaFacebookF, FaGooglePlay, FaTwitter, FaYoutube } from 'react-icons/fa'

function Footer() {
  return (
    <footer className='w-full flex flex-col border-t-[2px] border-secondary'>
      <section className='w-full h-auto md:min-h-100 bg-[#243640] relative overflow-hidden pb-20'>

        <div className='w-full absolute bottom-0 z-1 bg-[#243640]'>
        <DotLottieReact className='w-full mix-blend-multiply scale-120 lg:-translate-y-16' src="../assets/footer.lottie" loop autoplay />
        </div>
        <div className='flex flex-col justify-center items-center w-full h-full z-3 relative mt-6'>
        <div className='text-2xl md:text-4xl mb-4 font-semibold text-center text-white shadow-text-xs'>Share Bite</div>
        <div className='w-11/12 h-[2px] mb-4 bg-gradient-to-r from-transparent to-transparent via-secondary'></div>
        <div className='flex justify-center items-center gap-5 mb-3'>
          {
            navLinks.map((link, index) => <NavLink key={index} to={link.path} className={({ isActive }) => `text-base md:text-lg font-semibold hover:text-secondary transition-all duration-300 ease-in-out ${isActive ? 'text-secondary' : 'text-white'}`}>{link.name}</NavLink>)
          }

        </div>

        <div className='flex justify-center items-center gap-5'>
          {
            privateLinks.map((link, index) => <NavLink key={index} to={link.path} className={({ isActive }) => `text-base md:text-lg font-semibold hover:text-secondary transition-all duration-300 ease-in-out ${isActive ? 'text-secondary' : 'text-white'}`}>{link.name}</NavLink>)
          }

        </div>

        </div>

      </section>
      <section className='w-full bg-[#1e2f38] flex flex-col md:flex-row gap-2 justify-evenly items-center py-4'>
        <div className='flex justify-center items-center gap-2 text-white'>
          <span>Social Links : </span>
          <div className='flex justify-center items-center gap-2'>
            <Link to={''} className='
            h-7 w-7 flex justify-center items-center border-2 border-[#446171] bg-[#243640] rounded-full hover:bg-blue-500 transition-all duration-300 ease-in-out'>
            <FaFacebookF /></Link>
            <Link to={''} className='
            h-7 w-7 flex justify-center items-center border-2 border-[#446171] bg-[#243640] rounded-full hover:bg-sky-600 transition-all duration-300 ease-in-out'>
              <FaTwitter /></Link>
            <Link to={''} className='
            h-7 w-7 flex justify-center items-center border-2 border-[#446171] bg-[#243640] rounded-full hover:bg-red-500 transition-all duration-300 ease-in-out'>
            <FaYoutube /></Link>
          </div>
        </div>

        <div className='flex justify-center items-center gap-2 text-white'>
        <span>Our Apps : </span>
        <div className='flex justify-center items-center gap-2'>
            <Link to={''} className='
            h-7 w-7 flex justify-center items-center border-2 border-[#446171] bg-[#243640] rounded-full hover:bg-blue-500 transition-all duration-300 ease-in-out'>
            <FaGooglePlay /></Link>
            <Link to={''} className='
            h-7 w-7 flex justify-center items-center border-2 border-[#446171] bg-[#243640] rounded-full hover:bg-sky-600 transition-all duration-300 ease-in-out'>
              <FaAppStore /></Link>
          </div>
        </div>
        

      </section>
      <section className='w-full bg-[#151f24] flex flex-col md:flex-row gap-2 justify-evenly items-center py-3 text-white font-semibold'>Copyright © 2025 Share Bite
      </section>

    </footer>
  )
}

export default Footer
