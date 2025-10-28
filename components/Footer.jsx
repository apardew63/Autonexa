"use client";
import React from "react";
import {
  FiArrowRight,
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiTwitter,
} from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="mt-6 sm:mt-8 md:mt-12 bg-[#040506] py-6 sm:py-8 md:py-10">
      <div className="max-w-[1520px] text-center mx-auto px-4 sm:px-6 text-gray-400">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
          {/* === Left Section === */}
          <div className="flex-1 text-center sm:text-left">
            <img src="/images/logo.png" alt="logo" className="w-32 sm:w-36 md:w-40 mx-auto sm:mx-0" />
            <p className="max-w-sm text-xs sm:text-sm mt-3 leading-relaxed mx-auto sm:mx-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          {/* === Middle Section === */}
          <div className="text-center sm:text-left">
            <h5 className="font-bold text-[24px] sm:text-[26px] md:text-[28px] text-[#FFE000]">Home</h5>
            <ul className="mt-3 space-y-1 text-[16px] sm:text-[18px] md:text-[20px] text-white">
              <li className="hover:text-[#FFD700] cursor-pointer">About</li>
              <li className="hover:text-[#FFD700] cursor-pointer">Careers</li>
              <li className="hover:text-[#FFD700] cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* === Right Section (Support) === */}
          <div className="flex-1 flex flex-col text-center sm:text-right">
            {/* Heading stays left */}
            <h5 className="font-bold text-[24px] sm:text-[26px] md:text-[28px] text-[#FFE000] mb-4">
              Support
            </h5>

            {/* Input + Button aligned right */}
            <div className="flex justify-center sm:justify-end mb-4">
              <div className="flex bg-white rounded-sm overflow-hidden w-full max-w-xs sm:max-w-sm">
                <input
                  type="text"
                  placeholder="Enter Your Email"
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-gray-700 focus:outline-none text-sm"
                />

              </div>

            </div>
           <div className="flex justify-center sm:justify-end">
             <button className="flex items-center gap-2 bg-[#fff] text-black font-semibold px-4 sm:px-5 py-2 sm:py-3 hover:bg-[#FFD700] transition-colors text-sm sm:text-base">
                  View All <FiArrowRight size={16} className="sm:w-5 sm:h-5" />
                </button>
           </div>

            <div className="flex justify-center sm:justify-end gap-3 sm:gap-4 text-white mt-4">
              <FiFacebook
                size={18}
                className="hover:text-yellow-400 cursor-pointer w-4 h-4 sm:w-5 sm:h-5"
              />
              <FiInstagram
                size={18}
                className="hover:text-yellow-400 cursor-pointer w-4 h-4 sm:w-5 sm:h-5"
              />
              <FiTwitter
                size={18}
                className="hover:text-yellow-400 cursor-pointer w-4 h-4 sm:w-5 sm:h-5"
              />
              <FiLinkedin
                size={18}
                className="hover:text-yellow-400 cursor-pointer w-4 h-4 sm:w-5 sm:h-5"
              />
            </div>
          </div>
        </div>

        {/* === Bottom Copyright === */}
        <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-500 border-t border-gray-700 pt-4">
          © {new Date().getFullYear()} Autonexa. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
