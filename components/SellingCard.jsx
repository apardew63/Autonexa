"use client";
import React from "react";
import { FiArrowRight } from "react-icons/fi";
import Button from "./Button";

const SellingCard = ({ img, title, desc, model }) => {
  return (
    <div className="relative rounded-lg overflow-hidden h-[600px] cursor-pointer group">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-130"
        style={{ backgroundImage: `url(${img})` }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 transition-colors duration-500"></div>

      {/* Content Box */}
      <div
        className="
          absolute bottom-0 left-0 right-0 z-10 m-6
          bg-white/85 backdrop-blur-md rounded-lg p-4
          w-[300px] h-[120px] max-sm:w-auto max-sm:h-auto overflow-hidden
          flex flex-col justify-between
          transform origin-top-left 
          transition-all duration-500 ease-out
          group-hover:h-[200px]
        "
      >
        <div>
          <h3
            className="
              font-bold text-[#111] text-[28px] font-montserrat 
              transition-all duration-500 ease-out
              group-hover:text-[34px]
            "
          >
            {title}
          </h3>

          <p
            className="
              text-[#000] text-[16px] font-bold font-lato opacity-90
              transition-all duration-500 ease-out
              group-hover:text-[16px]
            "
          >
            {desc}
          </p>

          <p
            className="
              text-[#000000] text-[14px] mt-1 font-lato opacity-80
              transition-all duration-500 ease-out
              group-hover:text-[14px]
            "
          >
            {model}
          </p>
        </div>

        {/* Button (Hidden initially, appears on hover) */}
        <div
          className="
            opacity-0 translate-y-6 
            group-hover:opacity-100 group-hover:translate-y-0
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

export default SellingCard;
