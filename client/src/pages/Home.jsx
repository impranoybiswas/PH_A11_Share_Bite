import React from 'react'
import Header from '../layouts/Header'
import SectionHead from '../customs/SectionHead'
import 'aos/dist/aos.css';
import Services from '../layouts/Services'
import Donations from '../layouts/Donations'
import FeatureFoods from '../layouts/FeatureFoods';
import Partners from '../layouts/Partners';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Home() {


  return (
    <main className='text-3xl min-h-dvh w-full'> 
      <Header/>
      <section className='w-full lg:w-3/4 mx-auto flex flex-col justify-center items-center px-2 pb-10'>
        <Partners/>

        <SectionHead title="Features Food Items" subtitle="Food Collection Ready to Delivery" />
        <FeatureFoods/>

        <SectionHead title="Services"/>
        <Services/>

        <div className='w-full flex rounded-lg bg-white py-5 justify-center items-center my-6'>
        <DotLottieReact src="../assets/hero.lottie" loop autoplay />
        </div>

        <SectionHead title="Donations"/>
        <Donations/>

      </section>


    </main>
  )
}


      
