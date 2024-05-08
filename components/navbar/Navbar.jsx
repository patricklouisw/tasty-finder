import React from "react";
// import Links from "./Links";

const Navbar = () => {
  return (
    <div className="px-12 bg-black text-white flex justify-between items-center h-24">
      <div className=" flex-1 text-3xl font-bold tracking-wider">Tasty Finder</div>
      {/* <Links /> */}
    </div>
  );
};

export default Navbar;