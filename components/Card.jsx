"use client";
import React from "react";
import { FiArrowRight } from "react-icons/fi";
import Button from "./Button";

const Card = ({ img, title, desc }) => {
  return (
    <div className="relative rounded-lg overflow-hidden h-[600px] shadow-md group bg-[#fff]/10 cursor-pointer">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ backgroundImage: `url(${img})` }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/50"></div>

      {/* Content Box */}
      <div
        className="
          absolute bottom-0 left-0 z-10 m-6 
          bg-white/85 backdrop-blur-md rounded-lg p-6 
          w-[480px] h-[180px] max-sm:w-[290px] max-sm:h-[190px] overflow-hidden
          flex flex-col justify-between
          transform origin-top-left 
          transition-all duration-500 ease-out
          group-hover:h-[340px] group-hover:w-[675px]
        "
      >
        <div>
          <h3
            className="
              font-bold text-[#111] text-[28px] font-montserrat 
              transition-all duration-500 ease-out
              group-hover:text-[36px]
            "
          >
            {title}
          </h3>

          <p
            className="
              text-[#111] text-[16px] font-lato opacity-80
              transition-all duration-500 ease-out
              group-hover:text-[24px] group-hover:opacity-100 
              max-w-[400px]
            "
          >
            {desc}
          </p>
        </div>

        {/* Button always visible */}
        <div
          className="
            opacity-100 
            transition-all duration-500 ease-out
          "
        >
          <Button
            text="Get Started"
            Icon={FiArrowRight}
            className="bg-white text-black hover:bg-gray-100"
            onClick={() => alert('Let\'s go!')}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
