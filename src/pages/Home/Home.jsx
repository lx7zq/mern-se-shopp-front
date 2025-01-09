/* eslint-disable no-unused-vars */
import React from "react";
import Banner from "./Banner";
import Category from "./Category";
import Product from "./Product";
import Service from "./service";
import { Testimonials } from "./Testimonials";

const Home = () => {
  return (
    <div>
      <Banner />
      <Category />
      <Product />
      <Service />
      <Testimonials />
    </div>
  );
};

export default Home;
