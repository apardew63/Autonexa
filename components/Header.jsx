"use client";
import Image from "next/image";
import React from "react";
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter } from "react-icons/fi";

export default function Header() {
  return (
    <header className="w-full bg-black/30 backdrop-blur-sm sticky py-4 top-0 z-40 font-lato">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 py-4 grid grid-cols-3 items-center">

        {/* Left Column - Logo */}
        <div className="flex justify-start items-center">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={80}
            height={80}
            className="object-contain w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] lg:w-[100px] lg:h-[100px]"
          />
        </div>

        {/* Center Column - Navbar */}
        <nav className="hidden md:flex justify-center gap-4 lg:gap-6 xl:gap-10 text-[16px] lg:text-[18px] xl:text-[22px] text-white items-center font-normal">
          <a className="hover:underline cursor-pointer">Home</a>
          <a className="hover:underline cursor-pointer">About</a>
          <a className="hover:underline cursor-pointer">Auctions</a>
          <a className="hover:underline cursor-pointer">Contact</a>
        </nav>

        {/* Right Column - Social Icons and Login */}
        <div className="flex justify-end items-center gap-2 sm:gap-4 lg:gap-6 text-white">
          <FiFacebook size={16} className="hover:text-yellow-400 cursor-pointer w-4 h-4 sm:w-5 sm:h-5" />
          <FiInstagram size={16} className="hover:text-yellow-400 cursor-pointer w-4 h-4 sm:w-5 sm:h-5" />
          <FiTwitter size={16} className="hover:text-yellow-400 cursor-pointer w-4 h-4 sm:w-5 sm:h-5" />
          <FiLinkedin size={16} className="hover:text-yellow-400 cursor-pointer w-4 h-4 sm:w-5 sm:h-5" />
          <a href="/login" className="hover:underline cursor-pointer text-[14px] sm:text-[16px] lg:text-[18px] xl:text-[22px]">Login</a>
        </div>
      </div>
    </header>
  );
}
