"use client";
import React from "react";
import Button from "../components/Button";
import { FiArrowRight } from "react-icons/fi";
import SellingCard from "./SellingCard";

const cars = [
  { id: 1, img: "/images/car1.png", title: "BMW M3", price: "$45,000" },
  { id: 2, img: "/images/car2.png", title: "Audi A6", price: "$30,200" },
  { id: 3, img: "/images/car3.png", title: "Mercedes C300", price: "$38,900" },
  { id: 4, img: "/images/car4.png", title: "Toyota Supra", price: "$60,000" },
];

export default function NewSellingCars() {
  return (
    <section className="py-6 sm:py-8 md:py-12 lg:py-14">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
        <h2 className="text-[24px] sm:text-[32px] md:text-[40px] lg:text-[50px] font-bold text-white">Now Selling Cars</h2>
        <Button
                      text="View All"
                      Icon={FiArrowRight}
                      className="bg-white text-black hover:bg-gray-100"
                      onClick={() => alert("Let's go!")}
                    />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <SellingCard
            img="/images/car1.png"
            title="Toyota"
            model="Model: 2019"
            desc="Fortuner SUV"
          />
        <SellingCard
            img="/images/car2.png"
            title="Toyota"
            model="Model: 2019"
            desc="Fortuner SUV"
          />
          <SellingCard
            img="/images/car3.png"
            title="Toyota"
            model="Model: 2019"
            desc="Fortuner SUV"
          />
          <SellingCard
            img="/images/car4.png"
            title="Toyota"
            model="Model: 2019"
            desc="Fortuner SUV"
          />
      </div>
    </section>
  );
}
