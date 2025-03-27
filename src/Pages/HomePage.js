import React from "react";
import Footer from "../Common/Footer";
import Nav from "../Common/Nav";
import Slider from "../Component/Homes/Slider";
import Testimonial from "../Component/Homes/Testimonial";
import LatestBlog from "../Component/Blogs/LatestBlog";
import Videobanner from "../Component/Homes/Videobanner";
import Demand from "../Component/Homes/Demand";
import Categorys from "../Component/Homes/Categorys";
import Supplies from "../Component/Homes/Supplies";
import Newsletter from "../Component/Homes/Newsletter";

const HomePage = () => {
  return (
    <>
      <Nav />
      <Slider />
      <Categorys />
      <Supplies />
      <Demand />
      {/* <Videobanner /> */}
      <Testimonial />
      {/* <LatestBlog />
      <Newsletter /> */}
      <Footer />
    </>
  );
};

export default HomePage;
