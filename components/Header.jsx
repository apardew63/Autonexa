"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter, FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-black/30 backdrop-blur-sm sticky top-0 z-40 font-lato">
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
          <Link href="/" className="hover:underline cursor-pointer">Home</Link>
          <Link href="/about" className="hover:underline cursor-pointer">About</Link>
          <Link href="/auction" className="hover:underline cursor-pointer">Auctions</Link>
          <Link href="/contact" className="hover:underline cursor-pointer">Contact</Link>
        </nav>

        {/* Right Column - Social Icons, Login, and Mobile Menu */}
        <div className="flex justify-end items-center gap-2 sm:gap-4 lg:gap-6 text-white">
          <div className="hidden sm:flex gap-2 sm:gap-4 lg:gap-6">
            <FiFacebook size={16} className="hover:text-yellow-400 cursor-pointer w-4 h-4 sm:w-5 sm:h-5" />
            <FiInstagram size={16} className="hover:text-yellow-400 cursor-pointer w-4 h-4 sm:w-5 sm:h-5" />
            <FiTwitter size={16} className="hover:text-yellow-400 cursor-pointer w-4 h-4 sm:w-5 sm:h-5" />
            <FiLinkedin size={16} className="hover:text-yellow-400 cursor-pointer w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <a href="/login" className="hidden sm:block hover:underline cursor-pointer text-[14px] sm:text-[16px] lg:text-[18px] xl:text-[22px]">Login</a>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-[1520px] mx-auto px-4 py-6">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-white hover:text-yellow-400 transition-colors text-lg font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-white hover:text-yellow-400 transition-colors text-lg font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/auction"
                className="text-white hover:text-yellow-400 transition-colors text-lg font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Auctions
              </Link>
              <Link
                href="/contact"
                className="text-white hover:text-yellow-400 transition-colors text-lg font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="border-t border-white/20 pt-4 mt-4">
                <a
                  href="/login"
                  className="text-white hover:text-yellow-400 transition-colors text-lg font-medium py-2 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </a>
                <div className="flex gap-4 mt-4">
                  <FiFacebook size={20} className="hover:text-yellow-400 cursor-pointer" />
                  <FiInstagram size={20} className="hover:text-yellow-400 cursor-pointer" />
                  <FiTwitter size={20} className="hover:text-yellow-400 cursor-pointer" />
                  <FiLinkedin size={20} className="hover:text-yellow-400 cursor-pointer" />
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
