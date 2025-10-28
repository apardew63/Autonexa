"use client";
import React from "react";

const news = [
  {
    id: 1,
    title: "Exploring the World of Luxury Cars with a special Guest Interview",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    img: "/images/news1.png",
  },
  {
    id: 2,
    title: "Exploring the World of Luxury Cars with a special Guest Interview",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    img: "/images/news2.png",
  },
  {
    id: 3,
    title: "Exploring the World of Luxury Cars with a special Guest Interview",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    img: "/images/news3.png",
  },
];

export default function LatestNews() {
  return (
    <section className="py-6 sm:py-8 md:py-12 lg:py-14">
      <div className="mb-6 sm:mb-8 md:mb-10">
        <h4 className="text-[18px] sm:text-[20px] md:text-[26px] lg:text-[30px] font-normal text-[#FFD700]">
          Find Out Now
        </h4>
        <h3 className="text-[24px] sm:text-[28px] md:text-[36px] lg:text-[50px] font-bold leading-tight text-white">
          Latest News
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {news.map((n) => (
          <article
            key={n.id}
            className="bg-[#0f1724] rounded-lg overflow-hidden"
          >
            <img src={n.img} alt={n.title} className="w-full h-48 sm:h-56 md:h-60 lg:h-64 xl:h-70 object-cover" />
            <div className="p-3 sm:p-4 md:p-6 bg-white">
              <h4 className="font-bold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[25px]">{n.title}</h4>
              <p className="text-[#0B0B0B] text-[12px] sm:text-[14px] md:text-[16px] lg:text-[20px] mt-2">{n.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
