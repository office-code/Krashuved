import React from "react";
// import "./Blog.css"; // Adjust the path as necessary
import { FaHeart, FaEye, FaComments, FaRegCalendarAlt } from "react-icons/fa";
import { IoMdArrowForward } from "react-icons/io";
import blogImg from "../../Theme/blog-img.jpg";
import blogImg01 from "../../Theme/blog-img-01.jpg";
import blogImg02 from "../../Theme/blog-img-02.jpg";
import avtar from "../../Theme/avtar.jpg";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import "swiper/css/autoplay";
const LatestBlog = () => {
  const { i18n, t } = useTranslation();

  return (
    <>
     <div className="mt-4 mb-5">
      <div className="container">
        <div className="mb-7 text-center">
          <h2 className="text-[21px] sm:text-[25px] md:text-[26px] lg:text-[27px] xl:text-[27px] leading-normal font-semibold text-cyan-950">
            {t("home.homelatestblog.titlehendinglatestblog")}
          </h2>
          <p className="text-gray-700">
            {t("home.homelatestblog.titlepra")}
            </p>
        </div>
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            // Responsive breakpoints
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="mySwiper"
        >
          <SwiperSlide>
          <NavLink to="/Blog_details">   
            <div className="card border-2 border-transparent hover:border-yellow-600 rounded-lg hover:shadow-xl transition duration-300 ease-in-out">
              <img src={blogImg} alt="" className="w-full rounded-t-md" />
              <div className="p-3">
                <div className="text-slate-600 text-sm font-normal pt-2 flex items-center">
                  <FaRegCalendarAlt className="text-lime-900" />
                  <span className="ml-2">Oct, 2021</span>
                </div>
                <h2 className="text-slate-950 text-base font-semibold line-clamp-2 pt-2.5 h-[66px]">
                  The Future of Farming, Smart Irrigation Solutions
                </h2>
                <p className="text-slate-700 text-sm line-clamp-2 leading-6 pt-1 h-[52px]">
                  Mother’s Day is the perfect opportunity to show your mom how
                  much you appreciate and cherish
                </p>
                <div className="flex items-center pt-4">
                  <NavLink to="/Blog_details">
                    <img
                      className="w-12 h-12 rounded-full mr-2"
                      src={avtar}
                      alt="Avatar of Jonathan Reinink"
                    />
                  </NavLink>
                  <div className="text-sm">
                    <NavLink
                     to="/Blog_details"
                      className="text-gray-900 font-medium leading-none hover:text-indigo-600"
                    >
                      Jonathan Reinink
                    </NavLink>
                    <p className="text-gray-600">Aug 18</p>
                  </div>
                </div>
                <div className="text-right pt-1">
                  <NavLink to="/Blog_details" className="text-lime-900 text-sm font-semibold content-end">
                    Read More
                  </NavLink>
                </div>
              </div>
            </div>
            </NavLink>
          </SwiperSlide>
          <SwiperSlide>
          <NavLink to="/Blog_details">
            <div className="card border-2 border-transparent hover:border-yellow-600 rounded-lg hover:shadow-xl transition duration-300 ease-in-out">
              <img src={blogImg01} alt="" className="w-full rounded-t-md" />
              <div className="p-3">
                <div className="text-slate-600 text-sm font-normal pt-2 flex items-center">
                  <FaRegCalendarAlt className="text-lime-900" />
                  <span className="ml-2">Oct, 2021</span>
                </div>
                <h2 className="text-slate-950 text-base font-semibold line-clamp-2 pt-2.5 h-[66px]">
                  Agronomy and relation to Other Sciences
                </h2>
                <p className="text-slate-700 text-sm line-clamp-2 leading-6 pt-1 h-[52px]">
                  In November, unexpected rains wreaked havoc on West Bengal’s
                  potato crop, forcing farmers to
                </p>
                <div className="flex items-center pt-4">
                <NavLink to="/Blog_details">
                    <img
                      className="w-12 h-12 rounded-full mr-2"
                      src={avtar}
                      alt="Avatar of Jonathan Reinink"
                    />
                  </NavLink>
                  <div className="text-sm">
                  <NavLink to="/Blog_details"
                      className="text-gray-900 font-medium leading-none hover:text-indigo-600"
                    >
                      Jonathan Reinink
                    </NavLink>
                    <p className="text-gray-600">Aug 18</p>
                  </div>
                </div>
                <div className="text-right pt-1">
                  <NavLink to="/Blog_details" className="text-lime-900 text-sm font-semibold content-end">
                    Read More
                  </NavLink>
                </div>
              </div>
            </div>
            </NavLink>
          </SwiperSlide>
          <SwiperSlide>
          <NavLink to="/Blog_details">
            <div className="card border-2 border-transparent hover:border-yellow-600 rounded-lg hover:shadow-xl transition duration-300 ease-in-out">
              <img src={blogImg02} alt="" className="w-full rounded-t-md" />
              <div className="p-3">
                <div className="text-slate-600 text-sm font-normal pt-2 flex items-center">
                  <FaRegCalendarAlt className="text-lime-900" />
                  <span className="ml-2">Oct, 2021</span>
                </div>
                <h2 className="text-slate-950 text-base font-semibold line-clamp-2 pt-2.5 h-[66px]">
                  Wheat Procurement Gains Momentum In Punjab
                </h2>
                <p className="text-slate-700 text-sm line-clamp-2 leading-6 pt-1 h-[52px]">
                  This year, Punjab has witnessed a significant increase in
                  wheat purchases, surpassing the usual
                </p>
                <div className="flex items-center pt-4">
                  <NavLink to="/Blog_details">
                    <img
                      className="w-12 h-12 rounded-full mr-2"
                      src={avtar}
                      alt="Avatar of Jonathan Reinink"
                    />
                  </NavLink>
                  <div className="text-sm">
                    <NavLink to="/Blog_details"
                      className="text-gray-900 font-medium leading-none hover:text-indigo-600"
                    >
                      Jonathan Reinink
                    </NavLink>
                    <p className="text-gray-600">Aug 18</p>
                  </div>
                </div>
                <div className="text-right pt-1">
                  <NavLink to="/Blog_details" className="text-lime-900 text-sm font-semibold content-end">
                    Read More
                  </NavLink>
                </div>
              </div>
            </div>
            </NavLink>
          </SwiperSlide>
          {/* Add more SwiperSlides here */}
        </Swiper>
      </div>
    </div>
    </>
  );
};

export default LatestBlog;