import React from "react";
import { FaStar } from "react-icons/fa";
import testimonial from "../../Theme/testimonial.png";
import testimonial1 from "../../Theme/testimonial1.jpg";
import testimonial2 from "../../Theme/testimonial2.jpg";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import "swiper/css/autoplay";
import { useTranslation } from "react-i18next";
import Carousel from "react-bootstrap/Carousel";

import { NavLink } from "react-router-dom";
const Testimonial = () => {
  const { i18n, t } = useTranslation();
  return (
    <>
      {/* <section id="banner" className="relative bg-cover bg-center py-32" style={{ backgroundImage: `url(${newbanner})` }}>
  <div className="absolute inset-0 bg-green-900 opacity-70"></div>
  <div className="container mx-auto text-center relative z-10">
    <div className="text-box">
      <h1 className="text-white text-[21px] sm:text-[25px] md:text-[27px] lg:text-[30px] xl:text-[33px] font-semibold">
        {t("home.homebanne.titlehendingbanner")}
      </h1>
      <p className="text-white mt-2 mb-5">
        {t("home.homebanne.titleprabanner")}
      </p>
      <NavLink to="/contact" className="bg-lime-950 text-white px-6 py-2 rounded-full hover:bg-green-700 transition duration-300 ease-in-out">
        {t("button.buttonnow")}
      </NavLink>
    </div>
  </div>
</section> */}

      <div className="relative bg-white py-10 px-0">
        <div className="container mx-auto">
          <div className="row">
            <div className="col-md-12">
              <div className="text-center mb-4">
                <p className="text-orange-600"> {t("home.hometestimonials.title")}</p>
                <h1 className="text-[21px] sm:text-[25px] md:text-[27px] lg:text-[28px] xl:text-[28px] font-semibold text-cyan-950">{t("home.hometestimonials.subtitle")}</h1>

              </div>
            </div>
          </div>
          <Swiper
            slidesPerView={3}
            spaceBetween={10}
            autoplay={true}
            modules={[Autoplay]}
            className="mySwiper"
            breakpoints={{
              991: { slidesPerView: 3 },
              768: { slidesPerView: 2 },
              767: { slidesPerView: 2 },
              480: {
                slidesPerView: 1,
                spaceBetween: 24,
              },
              320: {
                slidesPerView: 1,
                spaceBetween: 44,
              },
            }}
          >
            <SwiperSlide>
              <div className="bg-lime-950 p-4 md:p-0 h-[320px]">
                {/* <img
                  src={testimonial}
                  className="testimonial-img w-[80px] h-[80px] rounded-full"
                  alt="Testimonial"
                /> */}
                <div className="flex-1 md:p-4 px-0">
                  <div className="flex items-center mt-2 mb-2 md:mb-4">
                    {[...Array(5)].map((star, index) => (
                      <i key={index} className="text-yellow-400">
                        <FaStar />
                      </i>
                    ))}
                  </div>
                  <p className="text-gray-300 text-[15px] mb-2 md:mb-4">
                    {t("home.hometestimonials.description1")}

                  </p>
                  <h6 className="text-white text-[18px] xl:text-[19px] font-medium">{t("home.hometestimonials.Balaram")}</h6>
                  <span className="text-orange-400 text-[16px]">{t("home.hometestimonials.ColdStoreManager")}</span>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className=" bg-lime-950 p-4 md:p-0 h-[320px]">
                {/* <img
                  src={testimonial1}
                  className="testimonial-img w-[80px] h-[80px] rounded-full"
                  alt="Testimonial"
                /> */}
                <div className="flex-1 md:p-4 px-0">
                  <div className="flex items-center mt-2 mb-2 md:mb-4">
                    {[...Array(5)].map((star, index) => (
                      <i key={index} className="text-yellow-400">
                        <FaStar />
                      </i>
                    ))}
                  </div>
                  <p className="text-gray-300 text-[15px] mb-2 md:mb-4">
                    {t("home.hometestimonials.description2")}
                  </p>
                  <h6 className="text-white text-[18px] xl:text-[19px] font-medium">{t("home.hometestimonials.Ramkrashna")}</h6>
                  <span className="text-orange-400 text-[16px]">{t("home.hometestimonials.Farmer")}</span>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className=" bg-lime-950 p-4 md:p-0 h-[320px]">
                {/* <img
                  src={testimonial2}
                  className="testimonial-img w-[80px] h-[80px] rounded-full"
                  alt="Testimonial"
                /> */}
                <div className="flex-1 md:p-4 px-0">
                  <div className="flex items-center mt-2 mb-2 md:mb-4">
                    {[...Array(5)].map((star, index) => (
                      <i key={index} className="text-yellow-400">
                        <FaStar />
                      </i>
                    ))}
                  </div>
                  <p className="text-gray-300 text-[15px] mb-2 md:mb-4">
                    {t("home.hometestimonials.description3")}
                  </p>
                  <h6 className="text-white text-[18px] xl:text-[19px] font-medium">{t("home.hometestimonials.Sunil")}</h6>
                  <span className="text-orange-400 text-[16px]">{t("home.hometestimonials.Farmer")}</span>
                </div>
              </div>
            </SwiperSlide>

          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
