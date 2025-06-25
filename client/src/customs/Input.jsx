import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

export default function Input({label, type, name, defaultValue, placeholder, passEye, req}) {
    const [showPassword, setShowPassword] = useState(false);
    if (passEye) type = showPassword ? "text" : "password";
  return (
    <div className='flex flex-col gap-0 w-full relative'>

    <span className='text-[8px] md:text-[10px] bg-base-100 py-[2px] px-2 ml-2 border-secondary border-[1px] rounded-t-md w-fit border-b-0'>{label}</span>

    <input
    name={name}
    required={req}
    type={type}
    defaultValue={defaultValue}
    placeholder={placeholder}
    className={`input w-full input-secondary z-9 focus-within:outline-offset-0 ${passEye && 'pr-10'}`}
    />

    {
    passEye && 
    <span
    onClick={() => setShowPassword(!showPassword)}
    className='absolute bottom-1 right-2 cursor-pointer w-6 h-6 md:w-8 md:h-8 flex justify-center items-center rounded-full text-sm z-10'>
        {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
    </span>
    }

    </div>
  )
}
