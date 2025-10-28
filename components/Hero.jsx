"use client";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { FiArrowRight } from "react-icons/fi";

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState(3600 * 24); // default 24h countdown

  // countdown logic
  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const format = (s) => {
    const d = Math.floor(s / 86400);
    s %= 86400;
    const h = Math.floor(s / 3600);
    s %= 3600;
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${d}d ${String(h).padStart(2, "0")}h:${String(m).padStart(
      2,
      "0"
    )}m:${String(sec).padStart(2, "0")}s`;
  };

  return (
    <section className="relative min-h-[500px] sm:min-h-[600px] md:min-h-[700px] lg:h-[880px] flex items-center">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/images/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black/65" />

      <div className="relative z-10 px-4 sm:px-6 flex flex-col items-center text-center gap-4 sm:gap-6 w-full max-w-[1700px] mx-auto justify-center">

        <h1 className="text-[32px] sm:text-[40px] md:text-[60px] lg:text-[70px] xl:text-[90px] font-[var(--font-montserrat)] text-white font-extrabold tracking-tight leading-[1.1] px-2">
          Luxury Cars. Live Auctions.
        </h1>

        <p className="text-white text-[14px] sm:text-[16px] md:text-[18px] lg:text-[22px] font-lato font-normal max-w-3xl px-4">
          Discover hand-picked cars and bid live on rare and exclusive vehicles.
        </p>

        <div className="flex items-center justify-center mt-4 sm:mt-6 w-full px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-[10px] rounded-md border border-white/30 bg-white/10 backdrop-blur-md p-2 md:px-6 w-full max-w-4xl">
            {/* Info Columns */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-start text-center md:text-left w-full sm:w-auto">
              <div className="flex flex-col p-2 sm:p-4 border-b sm:border-b-0 sm:border-r border-white/30 w-full sm:w-auto">
                <span className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-normal text-white">Brand</span>
                <p className="text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-normal text-gray-100">
                  Write the car brand name
                </p>
              </div>

              <div className="flex flex-col p-2 sm:p-4 border-b sm:border-b-0 sm:border-r border-white/30 w-full sm:w-auto">  
                <span className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-normal text-white">Model</span>
                <p className="text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-normal text-gray-100">
                  Write the car model name
                </p>
              </div>

              <div className="flex flex-col p-2 sm:p-4 w-full sm:w-auto">
                <span className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-normal text-white">Year</span>
                <p className="text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-normal text-gray-100">
                  Write the manufacturing year
                </p>
              </div>
              <Button
                      text="Get Started"
                      Icon={FiArrowRight}
                      className="bg-white text-black hover:bg-gray-100 mt-2 sm:mt-0"
                      onClick={() => alert("Let's go!")}
                    />
            </div>


          </div>
        </div>

        {/* CTA Button */}
        <Button
                text="Get Started"
                Icon={FiArrowRight}
                className="bg-white text-black hover:bg-gray-100 hidden sm:block"
                onClick={() => alert("Let's go!")}
              />

        {/* Countdown Card */}
        <div className="mt-6 sm:mt-8 ml-auto p-3 sm:p-4 md:p-6 rounded-[10px] flex flex-col items-start gap-2 bg-white/10 backdrop-blur-md border border-white/20 shadow-md max-w-[280px] sm:max-w-sm md:max-w-md w-full sm:w-[350px] md:w-[400px]">
          <div className="text-left">
            <div className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-gray-300 mb-1">
              Next Auction starts in
            </div>
            <div className="text-[24px] sm:text-[32px] md:text-[48px] lg:text-[64px] font-semibold text-white tracking-[4px] sm:tracking-[8px] md:tracking-[12px]">
              {/* {format(timeLeft)} */}00:00:00
            </div>
          </div>

          <div className="mt-4">
           <Button
                      text="Get Started"
                      Icon={FiArrowRight}
                      className="bg-white text-black hover:bg-gray-100"
                      onClick={() => alert("Let's go!")}
                    />
          </div>
        </div>
      </div>
    </section>
  );
}
