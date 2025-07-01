import React from 'react'

export default function SectionHead({title, subtitle}) {
  return (
    <header className='w-full pt-4 pb-6 md:pb-10 flex flex-col justify-center items-center gap-2'>
      <h1 className='text-3xl md:text-3xl lg:text-5xl font-semibold text-primary'>{title}</h1>
      <p className='text-sm md:text-base text-primary/60'>{subtitle}</p>
    </header>
  )
}
