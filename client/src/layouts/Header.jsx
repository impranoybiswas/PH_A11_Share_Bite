/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "motion/react";
import BlurText from "../components/BlurText";


const handleAnimationComplete = () => {
  
};

export default function Header() {
  return (
    <header className="h-[calc(100dvh+100px)] w-full bg-transparent relative overflow-hidden">
      <div className="w-full h-30 bg-gradient-to-t from-base-100 to-transparent absolute z-1 left-0 bottom-0"/>
      <p className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-2xl md:text-3xl font-semibold text-base-400 z-2">Our Partners</p>
      <motion.img
        animate={{ scale: [1.5, 1], opacity: [0, 1] }}
        transition={{
          duration: 2,
          repeat: 0, // Repeat once
          repeatType: "loop", // or 'reverse'
          ease: "easeInOut",
        }}
        className="w-full h-full object-cover absolute -z-1 top-0 left-0"
        src="../assets/hero.jpg"
      />

      <section className="h-full w-full pt-28 md:pt-32 px-[10px] md:px-20 flex flex-col items-center z-2 relative">
      <BlurText
      text="Share Food, Spread Love"
      delay={300}
      animateBy="words"
      direction="top"
      onAnimationComplete={handleAnimationComplete}
      className="text-2xl md:text-3xl lg:text-5xl mb-8 font-semibold text-center text-primary"
      />
      <motion.p animate={{ opacity: [0, 1] }} transition={{
          duration: 4,
          repeat: 0, // Repeat once
          repeatType: "loop", // or 'reverse'
          ease: "easeInOut",
        }}
        className="text-sm md:text-xl text-gray-700 leading-relaxed text-center max-w-[600px]">
        Together we can reduce food waste and fight hunger. Donate your surplus meals or pick up what you need every bite counts in building a more caring, sustainable community.
      </motion.p>
      </section>
    </header>
  );
}
