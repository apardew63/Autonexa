import Card from "./Card";

export default function About() {
  return (
    <section className="py-6 sm:py-8 md:py-12 lg:py-14 relative">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6">
        {/* Gradient Border Heading */}
        {/* <h2 className="relative text-[40px] sm:text-[60px] md:text-[95px] lg:text-[120px] xl:text-[195px] font-[var(--font-montserrat)] font-extrabold text-transparent text-center leading-tight">
          <span
            className="absolute inset-0 border-gradient-to-r from-[#FFD70080] via-[#FFD70026] to-[#FFD70080] bg-clip-text text-transparent
            [-webkit-text-stroke-width:2px] [-webkit-text-stroke-color:transparent]
            [mask-image:linear-gradient(to_right,rgba(0,0,0,1),rgba(0,0,0,1))]
            [background-clip:text]"
          >
            About Autonexa
          </span>
          <span
            className="text-transparent [-webkit-text-stroke-width:2px]
            [-webkit-text-stroke-color:rgba(255,215,0,0.5)]"
          >
            About Autonexa
          </span>
        </h2> */}

        {/* Paragraph */}
        <p className="text-white text-center max-w-6xl mb-6 sm:mb-8 md:mb-10 mx-auto font-lato text-sm sm:text-base md:text-lg px-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <Card
            img="/images/about1.png"
            title="Live Auctions"
            desc="Bid live on luxury cars and experience real-time excitement with every auction."
          />
          <Card
            img="/images/about2.png"
            title="Sell Your Car"
            desc="Easily list your premium vehicle and reach thousands of verified buyers instantly."
          />
        </div>
      </div>
    </section>
  );
}