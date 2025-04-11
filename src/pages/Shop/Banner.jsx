import React from "react";

const Banner = () => {
  return (
    <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-100%">
      <div className="py-12 flex flex-col justify-center item-center">
        <div className="text-center space-y-7 px-4">
          <h2 className="text-4xl md:text-5xl font-bold leading-snug">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam
            ex saepe, incidunt,
          </h2>
          <p className="text-xl text-[#4A4A4A]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere
            nesciunt debitis doloremque nulla. Eaque, magnam autem! Sapiente
            asperiores impedit quas laborum quasi iusto dicta, qui quia est,
            quos rerum cupiditate.
          </p>
          <a
            href=""
            className="btn bg-red text-white px-8 py-3 rounded-lg hover:bg-red-600 transition"
          >
            Order Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
