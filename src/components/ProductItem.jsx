/* eslint-disable no-unused-vars */
import React from "react";

const ProductItem = ({ image, name, price, rating }) => {
  return (
    <div className="bg-white px-3 py-2 rounded-2xl flex items-center gap-3 shadow-sm w-64">
      <img src={image} alt="" className="rounded-2xl w-20" />
      <div className="space-y-1">
        <h5>{name}</h5>
        <div className="rating rating-sm">
          <input
            type="radio"
            name={name}
            className="mask mask-heart bg-red-400"
            defaultChecked={rating == 1 ? true : false}
            disabled
          />
          <input
            type="radio"
            name={name}
            className="mask mask-heart bg-orange-400"
            defaultChecked={rating == 2 ? true : false}
            disabled
          />
          <input
            type="radio"
            name={name}
            className="mask mask-heart bg-yellow-400"
            defaultChecked={rating == 3 ? true : false}
            disabled
          />
          <input
            type="radio"
            name={name}
            className="mask mask-heart bg-lime-400"
            defaultChecked={rating == 4 ? true : false}
            disabled
          />
          <input
            type="radio"
            name={name}
            className="mask mask-heart bg-green-400"
            defaultChecked={rating == 5 ? true : false}
            disabled
          />
        </div>
        <p className="text-red">{price}</p>
      </div>
    </div>
  );
};

export default ProductItem;
