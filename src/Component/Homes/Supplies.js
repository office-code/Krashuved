import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import "swiper/css/autoplay";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { ThreeDots } from "react-loader-spinner";
const Demand = () => {
  const { i18n, t } = useTranslation();
  const user_id = JSON.parse(localStorage.getItem("user_id"));
  const [listcropdata, setListCropData] = useState([]);
  const { promiseInProgress } = usePromiseTracker();

  useEffect(() => {
    if (user_id) {
      trackPromise(
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/croplist`, {
            type: "supply",
            user_id: user_id,
          })
          .then((response) => {
            if (response.status == 200) {
              setListCropData(response.data);
            }
          })
          .catch((error) => {
            console.log(error);
          })
      )
    } else {
      trackPromise(
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/croplist`, {
            type: "supply",
            user_id: "0",
          })
          .then((response) => {
            if (response.status == 200) {
              setListCropData(response.data);
            }
          })
          .catch((error) => {
            console.log(error);
          })
      )
    }
  }, []);


  return (
    <div className="bg-gray-200">
      <div className="container">
        <div className="flex flex-wrap justify-between items-center py-6">
          <div className="w-full lg:w-1/2 mb-2 lg:mb-0">
            <div className="title-all text-left">
              <h1 className="text-[21px] sm:text-[25px] md:text-[27px] lg:text-[28px] xl:text-[28px] font-semibold text-cyan-950">
                {t("home.supplies.titlehendingsupplies")}
              </h1>
            </div>
          </div>
          <div className="flex justify-end items-center">
            <div className="title-all-veiw">
              <NavLink
                to="/supply"
                className="text-right text-lg font-medium text-black"
              >
                {t("home.viewall.titleviewall")}
              </NavLink>
            </div>
          </div>
        </div>
        {promiseInProgress === true ? (
          <div
            className="spinner"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
            }}
          >
            <ThreeDots
              height="60"
              width="60"
              color="#063014"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </div>
        ) : (
          <>
            {listcropdata.length === 0 ?
              <>
                <div className="h-56 text-center mt-5">
                  <p className="shipping-add-message"> {t("supply_list_data_show_messages.Supply")}</p>
                </div>
              </>
              :
              <Swiper
                slidesPerView={4}
                modules={[Autoplay]}
                spaceBetween={20}
                autoplay={false}
                breakpoints={{
                  991: { slidesPerView: 4 },
                  768: { slidesPerView: 3 },
                  767: { slidesPerView: 2 },
                  480: { slidesPerView: 1 },
                  320: { slidesPerView: 1 },
                }}
              >
                {listcropdata.map((element, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <NavLink to={`/supply-details/${window.btoa(element.crops_id)}`}>
                        <div className="bg-white rounded-lg shadow-md mb-5">
                          <div className="serv-img">
                            <img
                              src={element.crops_image}
                              className="w-full h-56 object-cover rounded-t-lg"
                            />
                          </div>
                          <div className="p-2">
                            <div className="p-2">
                              <h4 className="text-lg font-semibold  line-clamp-1">
                                {element.crops_name}
                              </h4>
                              <p className="overflow-hidden text-sm text-ellipsis whitespace-nowrap line-clamp-2">
                                {element.short_description}
                              </p>
                            </div>
                            <div className="flex justify-between border-b border-gray-300  p-1 ">
                              <div className="flex items-center mb-2">
                                <i>
                                  <FaRegCalendarAlt className="text-lime-600" />
                                </i>
                                <span className="text-sm pl-2 text-black">
                                  {element.crop_date}
                                </span>
                              </div>
                              <div className="flex items-center  mb-2">
                                <i>
                                  <CiLocationOn className="text-2xl text-lime-600" />
                                </i>
                                <span className="text-sm pl-2 text-black">
                                  {element.city}
                                </span>
                              </div>
                            </div>
                            <table className="table w-full min-w-full leading-normal">
                              <tbody>
                                <tr>
                                  <th className="text-sm">{t("suppliesanddemandsfiled.Type")}</th>
                                  <td className="text-sm text-right">
                                    {element.grading_type}
                                  </td>
                                </tr>
                                <tr>
                                  <th className="text-sm">{t("suppliesanddemandsfiled.Quantity")}</th>
                                  <td className="text-sm text-right">
                                    {element.qty}
                                  </td>
                                </tr>
                                <tr>
                                  <th className="text-sm">    {t("suppliesanddemandsfiled.Price")}</th>
                                  <td className="text-sm text-right">
                                    <span className="inline-flex items-center">
                                      <FaRupeeSign className="text-base" />
                                      <span className="ml-1">{element.price}</span>
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <div className="text-center bg-lime-950 p-2 rounded mt-3 mb-2">
                              <NavLink
                                to={`/supply-details/${window.btoa(element.crops_id)}`}
                                className="text-white text-sm font-medium"
                              >
                                {t("button.buttonnow")}
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      </NavLink>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            }
          </>
        )}
      </div>
    </div>
  );
};

export default Demand;
