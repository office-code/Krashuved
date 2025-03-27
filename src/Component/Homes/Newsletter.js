import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Newsletter = () => {
  const { i18n, t } = useTranslation();

  return (
    <>
   <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-6/12 lg:w-8/12 mb-6 md:mb-0">
            <h1 className="text-[20px] sm:text-[25px] md:text-[26px] lg:text-[27px] xl:text-[27px] font-semibold text-green-950">
              {t("home.homenewsletter.titlehendingemail")}
            </h1>
          </div>

          <div className="w-full md:w-6/12 lg:w-4/12  flex-col md:flex-row items-center">
            <h3 className="text-lg font-semibold mb-2 md:mb-0 md:mr-4">
              {t("home.homenewsletter.titlenewsletter")}
            </h3>
            <div className="relative flex">
              <input
                className="h-12 px-4 w-full border border-gray-300 rounded-l-lg focus:outline-none focus:border-purple-500"
                type="text"
                placeholder="Enter Your Email"
              />
              <button className="px-6 h-12 bg-lime-950 text-white rounded-r-lg hover:bg-green-700 focus:outline-none focus:bg-green-700">
                {t("home.homenewsletter.submitbutton")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Newsletter;
