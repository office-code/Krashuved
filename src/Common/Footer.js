import React from "react";
import { NavLink } from "react-router-dom";
import { GoLocation } from "react-icons/go";
import { FiPhoneCall } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import ScrollToTop from "react-scroll-to-top";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import logo2 from "../Theme/logo2.png";

const Footer = () => {
  const { i18n, t } = useTranslation();

  return (
    <>
      <ScrollToTop smooth className="d-flex justify-center items-center" />
      <div className="bg-lime-950 py-10">
        <div className="container mx-auto">
          <div className="row">
            <div className="col-md-4 col-xl-4">
              <img className="logo w-[113px] h-[107px] mb-4" src={logo2} alt="Logo" />
              <p className="text-slate-50 text-left text-[15px] pr-10">
                {t("footer.description")}
              </p>
              <div className="flex mt-4 space-x-4 mb-3">
                <a href="#" className="social-button facebook bg-blue-700 hover:bg-blue-800
                 w-11 h-11 flex justify-center text-center rounded-full text-white py-2"
                >
                  <FaFacebookF className="size-6 pt-1" />
                </a>
                <a href="#" className="social-button twitter bg-blue-500 hover:bg-blue-600
                 w-11 h-11 flex justify-center text-center rounded-full text-white py-2"
                >
                  <FaTwitter className="size-6 pt-1 " />
                </a>
                <a href="#" className="social-button instagram bg-red-600 hover:bg-red-700
                 w-11 h-11 flex justify-center text-center rounded-full text-white py-2"
                >
                  <FaInstagram className="size-6 pt-1" />
                </a>
              </div>
            </div>
            <div className="col-md-2 col-xl-2">
              <div className="part1">
                <h3 className="text-white text-[18px] sm:text-[19px] md:text-[20px] lg:text-[20px] xl:text-[21px] font-semibold mb-4">{t("footer.title1")}</h3>
                <NavLink to="/supply" className="text-white block mb-3 text-[15px]">{t("footer.footerssupplies")}</NavLink>
                <NavLink to="/demand" className="text-white block mb-3 text-[15px]">{t("footer.footersdemands")}</NavLink>
                {/* <NavLink to="/Gallery" className="text-white block mb-3 text-[15px]">{t("footer.footersmedia")}</NavLink> */}
                <NavLink to="/contact" className="text-white block mb-3 text-[15px]">{t("footer.footerContact1")}</NavLink>
              </div>
            </div>
            <div className="col-md-3 col-xl-3">
              <div className="part1">
                <h3 className="text-white text-[18px] sm:text-[19px] md:text-[20px] lg:text-[20px] xl:text-[21px] font-semibold mb-4">{t("footer.footerSupport")}</h3>
                <NavLink to="/privacy-policy" className="text-white block mb-3 text-[15px]">{t("footer.footerPrivacy")}</NavLink>
                <NavLink to="/terms-condition" className="text-white block mb-3 text-[15px]">{t("footer.footerTerm")}</NavLink>
                <NavLink to="/about-us" className="text-white block mb-3 text-[15px]">{t("footer.footeraboutas")}</NavLink>
              </div>
            </div>
            <div className="col-md-3 col-xl-3">
              <div className="part1">
                <h3 className="text-white text-[18px] sm:text-[19px] md:text-[20px] lg:text-[20px] xl:text-[21px] font-semibold mb-4">{t("footer.footerContact")}</h3>
                <p className="flex items-center text-white mb-3 text-[15px]">
                  <GoLocation className=" text-orange-400 size-6" />
                  <span className="ml-3">Indore Madhya Pradesh 452001</span>
                </p>
                <p className="flex items-center text-white mb-3 text-[15px]">
                  <FiPhoneCall className="text-orange-400 size-6" />
                  <span className="ml-3">96853227296</span>
                </p>
                <p className="flex items-center text-white mb-3 text-[15px]">
                  <AiOutlineMail className="text-orange-400 size-6" />
                  <span className="ml-3">info@krashuved.com</span>
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-zinc-100 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2">
              <div className="sm:col-span-1">
                <div className="bt-ft">
                  <h6 className="text-white text-sm">
                    {t("footerbottom.coptrighttitle")}
                  </h6>
                </div>
              </div>
              <div className="sm:col-span-1">
                <div className="text-left sm:text-right">
                  <h6 className="text-white text-sm">
                    Design and Developed by
                    <strong>
                      <a href="https://impetrosys.com/" target="_blank" className="text-orange-400">
                        IMPETROSYS
                      </a>
                    </strong>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
