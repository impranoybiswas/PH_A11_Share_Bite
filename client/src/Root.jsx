import React, { useEffect } from "react";
import { Outlet } from "react-router";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import GoToTop from "./components/GoToTop";
import HotToster from "./components/HotToster";
import usePageTitle from "./hooks/usePageTitle";
import Aos from "aos";
import { Tooltip } from "react-tooltip";

export default function Root() {

  usePageTitle();

  useEffect(() => {
    Aos.init({
      duration: 1000,       
      easing: "ease-in-out",
      once: false,          
      mirror: false        
    });
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <GoToTop/>
      <HotToster/>
      <Tooltip className="z-50" id="my-tooltip" />
    </>
  );
}
