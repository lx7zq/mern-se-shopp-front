import React from "react";
import ProductItem from "../../components/ProductItem";

const Banner = () => {
  return (
    <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
      <div className="py-24 flex flex-col md:flex-row items-center gap-8">
        {/* Left Content */}
        <div className="md:w-1/2 flex flex-col items-start space-y-6 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold leading-snug">
            Discover Unique{" "}
            <span className="text-red">Software Engineer Swag</span> for Every
            Coding Enthusiast!
          </h2>
          <p className="text-xl text-[#4A4A4A]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe
            molestiae ut hic in dolor eum eos sequi ullam.
          </p>
          <a
            href=""
            className="btn bg-red text-white px-8 py-3 rounded-lg hover:bg-red-600 transition"
          >
            Order Now
          </a>
        </div>

        {/* Right Content */}
        <div className="md:w-1/2 flex flex-col items-center">
          <img
            src="/images/home/banner.png"
            alt="Banner"
            className="w-full rounded-lg"
          />
          <div className="bg-white px-3 flex flex-col md:flex-row item-center justify-around -mt-16 gap-4">
            <ProductItem
              image="/images/home/gamepad.png"
              name="Game pad"
              rating="3"
              price="499"
            />
            <ProductItem
              image="/images/home/headphone.png"
              name="headphone"
              rating="2"
              price="599"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
