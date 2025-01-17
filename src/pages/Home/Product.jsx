/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ProductService from "../../services/product.service";
import Card from "../../components/Card";

const SampleNextArrow = (prop) => {
  const { className, style, onClick } = prop;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
    >
      NEXT
    </div>
  );
};

const SamplePrevArrow = (prop) => {
  const { className, style, onClick } = prop;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
    >
      Prev
    </div>
  );
};
const Product = () => {
  const [products, setProduct] = useState([]);
  const slider = useRef(null);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProductService.getAllProducts();
        const data = response.data;
        const special = data.filter((item) => item.category === "gadget");
        setProduct(special);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="section-container my-20 relative">
      <div className="text-left">
        <div className="subtitle">Special Item</div>
        <div className="title">Standount Itam from our Products</div>
      </div>
      <div className="md:absolute right-3 top-8 mb-10 md:mr-24">
        <button
          className="btn bg-red p-3 rounded-full mt-5 text-white text-lg hover:bg-red-600 "
          onClick={() => slider?.current?.slickPrev()}
        >
          &lt;
        </button>
        <button
          className="btn bg-red p-3 rounded-full mt-5 text-white text-lg hover:bg-red-600"
          onClick={() => slider?.current?.slickNext()}
        >
          &gt;
        </button>
      </div>
      <div className="slider-container">
        <Slider
          ref={slider}
          {...settings}
          className="overflow-hidden mt-10 space-x-5"
        >
          {products.length > 0 &&
            products.map((item, index) => {
              return <Card item={item} key={index} />;
            })}
        </Slider>
      </div>
    </div>
  );
};

export default Product;
