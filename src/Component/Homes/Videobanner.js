import React from "react";
import { FaPlay } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import videobanner from "../../Theme/videobanner.png";
const Videobanner = () => {
  const { i18n, t } = useTranslation();
  return (
    <div
      className="relative h-[500px] sm:h-[500px] bg-center bg-cover"
      style={{ backgroundImage: `url(${videobanner})` }}
    >
      <div className="absolute inset-0 bg-lime-950 opacity-80 z-[1]"></div>
      <div className="container mx-auto relative z-[2] h-full flex items-center">
        <div className="w-full text-center text-white">
          <h2 className="text-[21px] sm:text-[25px] md:text-[27px] lg:text-[30px] xl:text-[33px] font-bold mb-2">
            {t("home.homebannerviedo.titlehendingbanner")}
          </h2>
          <p className="text-sm">
            {t("home.homebannerviedo.titleprabanner")}
          </p>
          <a
            href="#"
            className="block w-[100px] h-[100px] mt-[50px] mx-auto bg-white rounded-full shadow-lg relative overflow-hidden"
          >
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-0 h-0 border-t-[15px] border-b-[15px] border-l-[25px] border-transparent border-l-[#063014]"></span>
            </span>
            <span className="absolute inset-0 w-full h-full border-8 border-[#063014] rounded-full animate-pulse"></span>
            <span className="absolute inset-0 w-full h-full border-4 border-[#063014] rounded-full animate-border"></span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Videobanner;
