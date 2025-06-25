import React from "react";

export default function Container({ children }) {
  return (
    <main className="w-full md:w-11/12 lg:w-4/5 min-h-dvh mx-auto px-2 md:px-0 pt-32 pb-10 flex flex-col justify-start items-center overflow-hidden">
      {children}
    </main>
  );
}
