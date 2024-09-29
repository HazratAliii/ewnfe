"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import axios from "axios";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navItems = authenticated
    ? [
        { name: "profile", path: "/" },
        { name: "search", path: "/search" },
        { name: "logout", path: "/logout" },
      ]
    : [
        { name: "signin", path: "/signin" },
        { name: "signup", path: "/signup" },
      ];

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/auth/logout`,
        {},
        { withCredentials: true }
      );

      router.push("/signin");
    } catch (err) {
      alert("Something went wrong");
      console.log(err);
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setAuthenticated(token !== null && token !== "");
    }
  }, []);

  return (
    <div className="relative w-full bg-[#ffffff] items-center justify-center h-[60px] lg:h-[86px]">
      <div className="flex w-full lg:w-2/3 mx-auto h-full items-center justify-between">
        <div className="text-2xl">logo</div>

        <div className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <span
              key={item.name}
              className={`${
                pathname === item.path ? "bg-black text-white" : ""
              } px-3 py-1 rounded`}
            >
              {/* <Link href={item.path}>{item.name}</Link> */}
              {item.name === "logout" ? (
                <button onClick={handleLogout}>{item.name}</button>
              ) : (
                <Link href={item.path}>{item.name}</Link>
              )}
            </span>
          ))}
        </div>

        <div className="md:hidden mr-3">
          <RxHamburgerMenu onClick={toggleDrawer} />
        </div>
      </div>

      {/* Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-1/2 bg-black text-white transform ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex justify-end p-4">
          <IoMdClose
            onClick={toggleDrawer}
            className="text-2xl cursor-pointer"
          />
        </div>
        <div className="flex flex-col items-start p-4 space-y-4">
          {navItems.map((item) => (
            <span
              key={item.name}
              className={`${
                pathname === item.path ? "bg-white text-black" : ""
              } w-full px-3 py-2 rounded cursor-pointer`}
            >
              {/* <Link href={item.path}>{item.name}</Link> */}
              {item.name === "logout" ? (
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 bg-black text-white rounded"
                >
                  {item.name}
                </button>
              ) : (
                <Link href={item.path}>{item.name}</Link>
              )}
            </span>
          ))}
        </div>
      </div>

      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleDrawer}
        ></div>
      )}
    </div>
  );
};

export default Navbar;
