"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FiArrowRight } from "react-icons/fi";
import Button from "./Button";

const slides = [
  {
    id: 1,
    img: "/images/user.png",
    city: "New York",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    name: "Daniel",
    title: "A Trustworthy Platform for Car Enthusiasts",
  },
  {
    id: 2,
    img: "/images/user.png",
    city: "London",
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    name: "Sophie",
    title: "Best Auction Experience Ever",
  },
  {
    id: 3,
    img: "/images/user.png",
    city: "Tokyo",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    name: "Kenji",
    title: "Smooth, Fast, and Reliable",
  },
];

export default function Testimonials() {
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 text-white">
      <div className="max-w-[1520px] mx-auto grid grid-cols-1 lg:grid-cols-[40%_60%] gap-6 sm:gap-8 md:gap-12 items-center px-4 sm:px-6 md:px-12">

        {/* === Left Text Section === */}
        <div className="space-y-3 sm:space-y-4 md:space-y-6">
          <h4 className="text-[18px] sm:text-[20px] md:text-[26px] lg:text-[30px] font-normal text-[#FFD700]">
            Find Out Now
          </h4>
          <h3 className="text-[24px] sm:text-[28px] md:text-[36px] lg:text-[50px] font-bold leading-tight">
            User Testimonials:
            <br /> What Our Customers <br /> Are Saying
          </h3>
          <Button
            text="Get Started"
            Icon={FiArrowRight}
            className="bg-white text-black hover:bg-gray-100"
            onClick={() => alert("Let's go!")}
          />
        </div>

        <div>
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={15}
            slidesPerView={1}
            navigation={true}
            autoplay={{ delay: 4000 }}
            className="pb-6 sm:pb-8 md:pb-10"
          >
            {slides.map((s) => (
              <SwiperSlide key={s.id} className="p-4 sm:p-6 md:p-8 lg:p-12">
                <div className="bg-[#2A323F] rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col justify-center items-center h-full shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <h4 className="text-[18px] sm:text-[20px] md:text-[26px] lg:text-[30px] font-bold mb-3 sm:mb-4 text-center">
                    {s.title}
                  </h4>
                  <p className="text-gray-300 text-[13px] sm:text-[14px] md:text-[16px] lg:text-[18px] mb-3 sm:mb-4 md:mb-6 leading-relaxed text-center">
                    {s.text}
                  </p>
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mt-auto">
                    <img
                      src={s.img}
                      alt={s.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-semibold">
                        {s.name}
                      </p>
                      <p className="text-[10px] sm:text-[12px] md:text-[14px] text-gray-400">
                        {s.city}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
