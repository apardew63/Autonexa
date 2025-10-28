"use client";
import React from "react";

const types = [
  { name: "Sedan", img: "/images/1.png" },
  { name: "SUV", img: "/images/2.png" },
  { name: "Coupe", img: "/images/3.png" },
  { name: "Hatchback", img: "/images/4.png" },
  { name: "Convertible", img: "/images/5.png" },
  { name: "Convertible", img: "/images/6.png" },
  { name: "Pickup", img: "/images/7.png" },
  { name: "Pickup", img: "/images/8.png" },
];

export default function SearchByBodyType() {
  return (
    <section className="py-6 sm:py-8 md:py-12 lg:py-14 text-white">
      {/* Section Headings */}
      <div className="text-center mb-6 sm:mb-8 md:mb-10">
        <h4 className="text-[16px] sm:text-[18px] md:text-[22px] lg:text-[26px] text-[#FFD700]">
          Find your Style
        </h4>
        <h3 className="text-[24px] sm:text-[28px] md:text-[34px] lg:text-[44px] xl:text-[50px] font-bold">
          Search by Body Type
        </h3>
      </div>

      {/* Grid Layout */}
      <div className="max-w-[1520px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 px-4 sm:px-6 md:px-10 place-items-center">
        {types.map((t, index) => (
          <div
            key={index}
            className="bg-[#2A323F] flex flex-col justify-center items-center p-3 sm:p-4 md:p-6 rounded-xl w-full max-w-[160px] sm:max-w-[200px] md:max-w-[280px] lg:max-w-[320px] h-[140px] sm:h-[160px] md:h-[180px] lg:h-[220px] xl:h-[240px] text-center cursor-pointer transition-all duration-300 hover:bg-[#1a2232] hover:border-[#FFD700] hover:border"
          >
            <img
              src={t.img}
              alt={t.name}
              className="w-[80px] sm:w-[100px] md:w-[120px] lg:w-[160px] xl:w-[200px] h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16 object-contain mx-auto mb-2 sm:mb-3"
            />
            <p className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-medium">
              {t.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
