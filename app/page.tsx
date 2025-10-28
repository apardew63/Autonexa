import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import NewSellingCars from "../components/NewSellingCars";
import HowItWorks from "../components/HowItWorks";
import ExclusiveAuction from "../components/ExclusiveAuction";
import SearchByBodyType from "../components/SearchByBodyType";
import Testimonials from "../components/Testimonials";
import LatestNews from "../components/LatestNews";
import Footer from "../components/Footer";
import CounterSection from '../components/CounterSection'
import Button from "../components/Button";
import { FiArrowRight } from "react-icons/fi";

export default function Page() {
  return (
    <div>
      <Header />
      <div
        className="relative"
        style={{
          backgroundImage: "url(/images/hero.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Hero />
      </div>
      <main>
        <img src="/images/about.png" className="mt-[80px]" />
        <About />

        <section className="max-w-[1520px] mx-auto px-6">
          <NewSellingCars />
          <HowItWorks />
          </section>
         <div className="bg-[#2A323F]"> <CounterSection /></div>
        <section className="max-w-[1520px] mx-auto px-6">

          <ExclusiveAuction />
          <SearchByBodyType />
          <Testimonials />
        </section>

        <div className="bg-[#FFD700]">
          <div className="max-w-[1520px] mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-8">
              <div className="text-center lg:text-left">
                <h4 className="text-[18px] sm:text-[20px] md:text-[26px] lg:text-[30px] font-normal text-[#0B0B0B]">
                  Right into Mailbox
                </h4>
                <h3 className="text-[24px] sm:text-[28px] md:text-[36px] lg:text-[50px] font-bold leading-tight text-[#0B0B0B]">
                  Get the news by subscribing to our newsletter. Tips directly.
                </h3>
                <div className="flex items-center bg-white rounded-sm overflow-hidden w-full max-w-sm sm:max-w-md mt-4 sm:mt-5 mx-auto lg:mx-0">
                  <input
                    type="text"
                    placeholder="Enter Your Email"
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-gray-700 focus:outline-none text-sm sm:text-base"
                  />
                  <div className="p-1">
                    <button className="flex items-center gap-2 bg-[#fff] border border-[#000] hover:bg-[#FFD700] text-black font-semibold px-4 sm:px-5 py-2 sm:py-3 transition-colors text-sm sm:text-base">
                      View All <FiArrowRight size={18} className="sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>

                {/* <Button
                  text="Get Started"
                  Icon={FiArrowRight}
                  className="bg-white text-black hover:bg-gray-100 mt-4"
                  onClick={() => alert("Let’s go!")}
                /> */}
              </div>
              <div className="flex-shrink-0">
                <img src="/images/19.png" alt="corolla" className="w-48 sm:w-56 md:w-64 lg:w-auto" />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[1520px] mx-auto px-6">
          <LatestNews />
        </div>
      </main>
      <Footer />
    </div>
  );
}
