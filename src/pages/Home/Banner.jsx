/* eslint-disable no-unused-vars */
import React from "react";
import ProductItem from "../../components/ProductItem";

const Banner = () => {
  return (
    <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
      <div className="py-24 flex flex-col md:flex-row-reverse justify-between item-center">
        <div className="md:w-1/2">
          <img src="/images/home/banner.png" alt="" />
          <div className="flex flex-col md:flex-row item-center justify-around mt-16 gap-4">
            <ProductItem
              image="/images/home/gamepad.png"
              name="Game pad"
              rating="2"
              price="499"
            />
          </div>
        </div>
        <div className="md:w-1/2">
          <h2 className="md:text-4xl text-4xl font-bold md:leading-sung leading-sung">
            Discover Uniq <span>Softwear Enginear Swag</span> for Every Coding
            Enthusiat!
          </h2>
          <p className="text-xl text[#4A4A4A]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe
            molestiae ut hic in dolor eum eos sequi ullam
          </p>
          <a href="" className="btn bg-red px-8"></a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
