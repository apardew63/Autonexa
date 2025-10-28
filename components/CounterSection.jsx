"use client";
import React from "react";
import CountUp from "react-countup";

const stats = [
  { number: 40, suffix: "k", label: "Registered Members" },
  { number: 150, suffix: "M+", label: "Inventory Sold" },
  { number: 100, suffix: "%", label: "Selling Price Received" },
  { number: 6, suffix: "k+", label: "Satisfied Customers" },
];

const CounterSection = () => {
  return (
    <section className="text-white py-12 sm:py-16">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center">
            <h2 className="text-[32px] sm:text-[36px] md:text-[42px] font-bold text-white mb-2">
              <CountUp
                start={0}
                end={stat.number}
                duration={2.5}
                enableScrollSpy
                scrollSpyOnce
              />
              {stat.suffix}
            </h2>
            <p className="text-gray-300 text-[14px] sm:text-[16px] font-light">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CounterSection;
