import React from "react";
import "swiper/css/bundle";
import "swiper/css/autoplay";
import organic from "../../Theme/organic.png";
import homepotato from "../../Theme/homepotato.png";
import { NavLink } from "react-router-dom";
const Categorys = () => {
  return (
    <>
      <div className="category py-6">
        <div className="container mx-auto">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 p-2">
              <NavLink
                to="/supply"
              >
                <div className="relative rounded-2xl bg-green-900 p-6 flex  h-100">
                  <div className="banes-text mt-2">
                    <span
                      className="inline-block bg-yellow-400 px-2 py-2 rounded-full text-green-900 text-sm font-bold"
                    >
                      Get in touch
                    </span>
                    <h5 className="text-white text-[20px] sm:text-[25px] md:text-[28px] lg:text-[30px] xl:text-[35px] mt-2 font-bold">Krashuved Mandi</h5>
                  </div>
                  <div className="flex-grow">
                    <img src={organic} className="md:w-full md:h-full w-30 h-30 rounded-2xl" alt="Organic Potato" />
                  </div>
                </div>
              </NavLink>
            </div>
            <div className="w-full md:w-1/2 p-2">
              <NavLink
                to="/contact"
              >
                <div className="relative rounded-2xl bg-yellow-400 w-90 p-4 flex  h-100">
                  <div className="banes-text-1 mt-2">
                    <span
                      className="inline-block mt-3 bg-green-900 px-2 py-2 rounded-full text-white text-sm font-bold"
                    >
                      Get in touch
                    </span>
                    <h5 className="text-white mt-2 text-[20px] sm:text-[25px] md:text-[28px] lg:text-[30px] xl:text-[35px] font-bold">Krashuved Beez Bazaar</h5>
                  </div>
                  <div className="flex-grow">
                    <img src={homepotato} className="md:w-full md:h-full w-30 h-30 rounded-2xl" alt="Organic Fruits" />
                  </div>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categorys;
