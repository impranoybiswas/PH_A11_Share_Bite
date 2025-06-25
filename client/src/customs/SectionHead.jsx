import React from 'react'

export default function SectionHead({title, subtitle}) {
  return (
    <header className='w-full py-4 flex flex-col justify-center items-center gap-2'>
      <h1 className='text-2xl md:text-3xl lg:text-4xl font-semibold text-secondary'>{title}</h1>
      <p className='text-sm md:text-base text-secondary/60'>{subtitle}</p>
    </header>
  )
}
