import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../../Common/Nav";
import Footer from "../../Common/Footer";
import { useTranslation } from "react-i18next";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { ThreeDots } from "react-loader-spinner";

export default function Notificationall() {
  const token = JSON.parse(localStorage.getItem("token"));
  const { i18n, t } = useTranslation();
  // loder
  const { promiseInProgress } = usePromiseTracker();
  // notificationslist api calling
  const [notificationslistdata, setNotificationsListData] = useState([]);
  useEffect(() => {
    trackPromise(
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/notificationslist`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            setNotificationsListData(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        })
    );
  }, []);
  return (
    <>
      <Nav />

      <div className="container mx-auto">
        <div className="lg:py-8 lg:px-10 md:py-8 md:px-10 sm:py-6 sm:px-6 px-4 py-4  mx-2 my-4 bg-white">
          <h5 className="text-[20px] lg:text-[23px] font-semibold mt-2 mb-2 pb-3 border-b text-orange-500">
            All Notifications
          </h5>
          <div className="mt-2 mb-2">
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
                <ul className={` list-none bg-slate-50 w-full animate-slideIn`}>
                  <div className="overflow-y-scroll h-[350px]">
                    {notificationslistdata.length === 0 ? (
                      <div className="d-flex justify-center items-center">
                      <h5>{t("demand_list_data_show_messages.MyContact")}</h5>
                    </div>
                    ) : (
                      <>               
                        {notificationslistdata.map((element, index) => {
                          return (
                            <li
                              className="p-3 border-b border-gray-200 "
                              key={index}
                            >
                              <div className="">
                                <div className="ms-2 hover:text-orange-600">
                                  <div className="d-flex justify-between items-center ">
                                    <p className="text-[17px] font-semibold">
                                      {element.sender_name}
                                    </p>
                                    <span className="text-[14px] font-[600]  hover:text-orange-600">
                                      {element.msg_received_since}
                                    </span>
                                  </div>
                                  <p className="text-[14px] text-gray-500 ">
                                    {element.message}
                                  </p>
                                  <p className="text-[14px] text-orange-600 text-end pt-2">
                                    {element.notification_date}
                                  </p>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </>
                    )}
                  </div>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
