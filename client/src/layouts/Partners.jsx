import React from "react";

export default function Partners() {
  const partners = [
    "./assets/partners/1.png",
    "./assets/partners/2.svg",
    "./assets/partners/3.webp",
    "./assets/partners/4.png",
    "./assets/partners/6.png",
    "./assets/partners/5.png", 
  ];
  return (
    <div className="w-11/12 grid grid-cols-3 md:grid-cols-4 gap-2 lg:grid-cols-6 justify-center items-center mt-8 mb-15">
      {partners.map((partner, index) => (
        <div
          data-aos="fade-up"
          key={index}
          className="h-16 flex justify-center items-center group"
        >
          <img
            key={index}
            src={partner}
            alt="partner"
            className="h-full object-contain grayscale-100 group-hover:grayscale-0 transition-all duration-400 ease-in-out"
          />
        </div>
      ))}
    </div>
  );
}
