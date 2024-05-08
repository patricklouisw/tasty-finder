import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="p-10 bg-black flex flex-col justify-center items-center text-gray-400 gap-5 lg:text-start lg:flex-row lg:justify-between ">
      <div className="font-bold tracking-wider">Tasty Finder</div>
      <div className=" flex flex-col text-sm gap-1 text-center lg:text-end">
        <span className="font-bold">Tasty Finder © All rights reserved.</span>
        <p className="">
          Developed by{" "}
          <Link
            className="underline text-blue-400 hover:text-blue-200"
            href={"https://www.linkedin.com/in/patricklouisw/"}
          >
            Patrick Louis
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Footer;
