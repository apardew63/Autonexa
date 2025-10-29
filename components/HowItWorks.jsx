"use client";
import React from "react";

const Item = ({ imgsrc, title, desc }) => (
  <div className="flex flex-col items-center text-center p-4 w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] h-auto sm:h-[350px] md:h-[400px]">
    <div className="w-[100px] sm:w-[120px] md:w-[140px] h-[100px] sm:h-[120px] md:h-[140px] mb-4 sm:mb-6 flex items-center justify-center">
      <img src={imgsrc} alt={title} className="w-full h-full object-contain" />
    </div>
    <h4 className="font-semibold mb-3 sm:mb-4 text-[20px] sm:text-[24px] md:text-[28px] text-white">{title}</h4>
    <p className="text-gray-300 text-[14px] sm:text-[16px] md:text-[17px] leading-relaxed w-full">
      {desc}
    </p>
  </div>
);

export default function HowItWorks() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <h2 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] font-bold text-white text-center mb-8 sm:mb-12 md:mb-16">
          How It Works
        </h2>

        <div className="hidden sm:block ml-10 md:ml-20 lg:ml-20">
          <img src="/images/arr2.png" className="w-full max-w-[320px] md:max-w-[420px]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-102 md:gap-16 lg:gap-50 place-items-center">
          <Item
            imgsrc="/images/how3.png"
            title="Join Auctions"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />

          <Item
            imgsrc="/images/how2.png"
            title="Buy or Sell"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />

          <Item
            imgsrc="/images/how1.png"
            title="Get Paid"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
        </div>

        <div className="hidden sm:block ml-20 md:ml-32 lg:ml-40 xl:ml-150">
          <img src="/images/arr1.png" className="w-full max-w-[320px] md:max-w-[420px]" />
        </div>
      </div>
    </section>
  );
}
