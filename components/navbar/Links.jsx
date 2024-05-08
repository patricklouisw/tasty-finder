"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const listOfLinks = [
  {
    title: "Homepage",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
  {
    title: "Blog",
    path: "/blogs",
  },
];

const auth = {
  loginRegister: {
    title: "Blog",
    path: "/blogs",
  },
  logout: {
    title: "Blog",
    path: "/blogs",
  },
};

const Links = () => {
  const pathname = usePathname();
  const [session, setSession] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* For large navbar */}
      <div className="hidden lg:flex lg:gap-16">
        {listOfLinks.map((link) => (
          <Link
            key={`nav_` + link.title.toLowerCase()}
            className={`px-3 py-2 rounded-full

          ${
            pathname == link.path
              ? "bg-white text-black scale-105"
              : "hover:bg-white hover:text-black hover:scale-105"
          } `}
            href={link.path}
          >
            {link.title}
          </Link>
        ))}

        {/* Only show button if user is admin */}
        {session && admin && (
          <Link
            key={`nav_admin`}
            className={`px-3 py-2 rounded-full

          ${
            pathname == "/admin"
              ? "bg-white text-black scale-105"
              : "hover:bg-white hover:text-black hover:scale-105"
          } `}
            href="/admin"
          >
            Admin
          </Link>
        )}

        {session ? (
          <Link
            key={`nav_logout`}
            className={`px-3 py-2 bg-white text-black hover:bg-gray-200`}
            href={pathname}
            onClick={() => setSession(!session)}
          >
            Logout
          </Link>
        ) : (
          <Link
            key={`nav_login`}
            className={`px-3 py-2 bg-white text-black hover:bg-gray-200`}
            href={pathname}
            onClick={() => setSession(!session)}
          >
            Login / Register
          </Link>
        )}
      </div>

      {/* For Mobile devices */}
      <Image
        src="/menu.png"
        alt="burger"
        width={30}
        height={30}
        className="object-contain object-right lg:hidden cursor-pointer"
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div className="absolute top-0 right-0 w-3/4 h-screen z-10 bg-blue-950 py-6 px-10 flex flex-col items-end gap-10">
          <Image
            src="/close.png"
            alt="close"
            width={50}
            height={50}
            className="object-contain object-right lg:hidden cursor-pointer"
            onClick={() => setOpen(!open)}
          />

          {listOfLinks.map((link) => (
            <Link
              key={`nav_` + link.title.toLowerCase()}
              onClick={() => setOpen(!open)}
              className={`p-3 rounded-l-lg w-3/4 text-end

          ${
            pathname == link.path
              ? "bg-white text-black scale-105"
              : "hover:bg-white hover:text-black hover:scale-105"
          } `}
              href={link.path}
            >
              {link.title}
            </Link>
          ))}

          {/* Only show button if user is admin */}
          {session && admin && (
            <Link
              key={`nav_admin`}
              onClick={() => setOpen(!open)}
              className={`px-3 py-2 rounded-full


          ${
            pathname == "/admin"
              ? "bg-white text-black scale-105"
              : "hover:bg-white hover:text-black hover:scale-105"
          } `}
              href="/admin"
            >
              Admin
            </Link>
          )}

          {session ? (
            <Link
              key={`nav_logout`}
              className={`px-3 py-2 bg-white text-black hover:bg-gray-200`}
              href={pathname}
              onClick={() => {
                setOpen(!open);
                setSession(!session);
              }}
            >
              Logout
            </Link>
          ) : (
            <Link
              key={`nav_login`}
              className={`px-3 py-2 bg-white text-black hover:bg-gray-200`}
              href={pathname}
              onClick={() => {
                setOpen(!open);
                setSession(!session);
              }}
            >
              Login / Register
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Links;