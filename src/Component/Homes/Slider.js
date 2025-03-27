import React from "react";
import { useTranslation } from "react-i18next";
import banner1 from "../../Theme/silder1.png";
import banner2 from "../../Theme/silder2.png";
import banner3 from "../../Theme/silder3.png";

import Carousel from "react-bootstrap/Carousel";
const Slider = () => {

  const { i18n, t } = useTranslation();
  return (
    <>
      <Carousel indicators={false}>
      <Carousel.Item>
          <div className="relative w-full h-full">
            <img className="w-full h-full" src={banner2} alt="Slide 2" />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="relative w-full h-full ">
            <img className="w-full h-full " src={banner1} alt="Slide 1" />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="relative w-full h-full">
            <img className="w-full h-full" src={banner3} alt="Slide 2" />
          </div>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default Slider;
