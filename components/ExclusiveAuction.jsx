"use client";
import React from "react";
import Button from "./Button";
import { FiArrowRight } from "react-icons/fi";

export default function ExclusiveAuction() {
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-[#0a0a0a] rounded-2xl px-4 sm:px-6 md:px-12 mt-6 sm:mt-8 md:mt-12 lg:mt-16">
      <div className="max-w-[1520px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center">
        {/* === Left Content === */}
        <div className="space-y-3 sm:space-y-4 md:space-y-6">
          <h3 className="text-[24px] sm:text-[32px] md:text-[40px] lg:text-[50px] font-bold text-white leading-tight">
            Exciting & Exclusive Auction <br />
            Lot Cars Ready for Bidding
          </h3>

          <p className="text-gray-300 leading-relaxed text-[13px] sm:text-[14px] md:text-[16px] max-w-[520px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.
          </p>

          {/* === Car Details === */}
          <ul className="grid grid-cols-1 sm:grid-cols-1 gap-y-2 sm:gap-y-3 gap-x-4 sm:gap-x-8 text-gray-200 text-[12px] sm:text-[13px] md:text-[15px] mt-4 list-disc p-3 sm:p-4">
            <li className="">
              <span className="font-semibold text-white">Year:</span> 2023
            </li>
            <li>
              <span className="font-semibold text-white">Make:</span>{" "}
              Mercedes-Benz
            </li>
            <li>
              <span className="font-semibold text-white">Model:</span> G AMG
            </li>
            <li>
              <span className="font-semibold text-white">Mileage:</span> 15,000
              Miles
            </li>
            <li>
              <span className="font-semibold text-white">Color:</span> Dream
              White
            </li>
            <li>
              <span className="font-semibold text-white">Condition:</span>{" "}
              Excellent
            </li>
            <li>
              <span className="font-semibold text-white">Engine:</span> 3.0L V6
              Twin Turbo
            </li>
            <li>
              <span className="font-semibold text-white">Transmission:</span>{" "}
              8-Speed Automatic
            </li>
          </ul>

          {/* === Button === */}
          <div className="pt-3 sm:pt-4">
            <Button
              text="Get Started"
              Icon={FiArrowRight}
              className="bg-white text-black hover:bg-gray-100"
              onClick={() => alert("Let's go!")}
            />
          </div>
        </div>

        {/* === Right Image === */}
        <div className="relative h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[550px] overflow-hidden mt-6 md:mt-0">
          <img
            src="/images/exclusive.png"
            alt="exclusive"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
