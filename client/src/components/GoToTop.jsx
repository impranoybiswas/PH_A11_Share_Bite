import React, { useContext } from "react";
import { ScrollContext } from "../providers/Context";
import { FaRegArrowAltCircleUp } from "react-icons/fa";

export default function GoToTop() {
  const { isScrolled } = useContext(ScrollContext);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (isScrolled)
    return (
      <FaRegArrowAltCircleUp
        data-tooltip-id="my-tooltip"
        data-tooltip-content="GO TO TOP"
        onClick={scrollToTop}
        className="fixed cursor-pointer bottom-6 right-6 animate-bounce bg-primary/80 rounded-full hover:bg-primary text-white z-40"
        color="#fff"
        size={40}
      />
    );
}
