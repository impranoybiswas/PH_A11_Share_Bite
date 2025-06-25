import React from 'react'

export default function Button({type, label, onClick}) {
  return (
    <button
    type={type}
    onClick={onClick}
    className='h-10 md:h-12 w-full px-5 rounded-md flex justify-center items-center relative overflow-hidden
    bg-gradient-to-l from-[#445275] to-[#2f3449] cursor-pointer
    after:rounded-full after:w-10 after:h-10 after:bg-secondary
    after:absolute after:bottom-0 after:z-1 after:origin-center after:scale-0
    after:transition-all after:duration-1000 hover:after:scale-15000
    uppercase tracking-[0.3rem] md:tracking-[0.5rem] font-semibold taxt-base md:text-xl z-2'
    >
      <span className='z-3 text-shadow-md text-white'>{label}</span>
    </button>
  )
}
